'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import {
  checkEmailAndSendCode,
  checkNickname,
  confirmCode,
  employerSignUp,
  userSignUp,
} from '@/service/auth';
import { useRouter } from 'next/navigation';
import { UserType } from '@/types/common';
import { EmployerSignupFormData } from '@/types/auth';
import BlueBtn from '../shared/btn/BlueBtn';
import IsValidBtn from '../shared/btn/IsValidBtn';
import {
  validateEmail,
  validateNickname,
  validatePassword,
} from '@/utils/validation';
import { BASIC_INPUT_STYLE } from '@/constants/style';
import { notifyToast } from '@/utils/notify';
import Link from 'next/link';

type Props = {
  loginType: UserType;
};

export default function SignupForm({ loginType }: Props) {
  const router = useRouter();
  const [signupData, setSignupData] = useState(
    loginType === 'user'
      ? {
          email: '',
          authCode: '',
          pw: '',
          confirmPw: '',
          nickname: '',
        }
      : {
          email: '',
          authCode: '',
          pw: '',
          confirmPw: '',
          nickname: '',
          company: '',
        }
  );

  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidCode, setIsValidCode] = useState(false);
  const [isValidNickname, setIsValidNickname] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setSignupData((info: any) => ({ ...info, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !(
        isValidEmail &&
        isValidCode &&
        isValidNickname &&
        validateNickname(signupData.nickname)
      )
    ) {
      notifyToast('중복확인 또는 인증 처리에 문제가 있습니다.', 'error');
      return;
    }

    if (!validatePassword(signupData.pw)) {
      notifyToast(
        '비밀번호 형식에 맞지 않습니다. 비밀번호 형식 : 8~15자리 (영어, 숫자, 특수문자(@$!%*#?&)) 포함)',
        'error'
      );
      return;
    }

    if (signupData.pw !== signupData.confirmPw) {
      notifyToast('비밀번호가 같지 않습니다.', 'error');
      return;
    }

    loginType === 'user'
      ? userSignUp({
          user_name: signupData.nickname,
          login_type: 0,
          user_email: signupData.email,
          user_pw: signupData.pw,
        }).then((data) =>
          router.push(`/signup/setting/${data.id}?type=${data.role}`)
        )
      : employerSignUp({
          user_name: signupData.nickname,
          login_type: 0,
          user_email: signupData.email,
          user_pw: signupData.pw,
          companyName: (signupData as EmployerSignupFormData).company,
        }).then((data) =>
          router.push(`/signup/setting/${data.id}?type=${data.role}`)
        );
  };

  const handleIsValidEmail = () => {
    if (signupData.email.length === 0) {
      notifyToast('이메일을 입력해주세요.', 'error');
      setIsValidEmail(false);
      return;
    }

    if (!validateEmail(signupData.email)) {
      notifyToast('이메일 형식에 맞지 않습니다', 'error');
      setIsValidEmail(false);
      return;
    }

    checkEmailAndSendCode(signupData.email, 'signup').then((res) => {
      if (res.code) {
        notifyToast(res.message, 'error');
        return;
      }
      notifyToast(res.message, res.isSuccess ? 'success' : 'error');
      setIsValidCode(false);
      setIsValidEmail(res.isSuccess ? true : false);
    });
  };

  const handleConfirmCode = () => {
    confirmCode(signupData.email, signupData.authCode).then((data) => {
      notifyToast(data.message, data.valid ? 'success' : 'error');
      setIsValidCode(data.valid ? true : false);
    });
  };

  const handleIsValidNickname = () => {
    if (!validateNickname(signupData.nickname)) {
      notifyToast(
        '닉네임 형식에 맞지 않습니다. 닉네임 형식 : 4~14자리 (영어, 숫자 : 1자, 한글 : 2자)',
        'error'
      );
      setIsValidNickname(false);
      return;
    }

    checkNickname(signupData.nickname).then((data) => {
      notifyToast(data.message, data.valid ? 'success' : 'error');
      setIsValidNickname(data.valid ? true : false);
    });
  };

  return (
    <form className="flex flex-col w-full" onSubmit={handleSubmit}>
      <div className="flex flex-col my-1">
        <label htmlFor="email" className="text-xs sm:text-sm">
          이메일
        </label>
        <div className="flex items-center">
          <input
            className={BASIC_INPUT_STYLE}
            type="email"
            id="email"
            name="email"
            value={signupData.email}
            onChange={handleChange}
            required
            placeholder="이메일을 입력해주세요."
            readOnly={isValidCode}
          />
          <IsValidBtn
            text="코드전송"
            onClick={handleIsValidEmail}
            isValid={isValidEmail}
            disabled={isValidCode}
          />
        </div>
      </div>
      {isValidEmail && (
        <div className="flex flex-col my-1">
          <label htmlFor="authCode" className="text-xs sm:text-sm">
            인증번호
          </label>
          <div className="flex items-center">
            <input
              className={BASIC_INPUT_STYLE}
              type="text"
              id="authCode"
              name="authCode"
              value={signupData.authCode}
              onChange={handleChange}
              required
              placeholder="인증번호 6자리를 입력해주세요."
              readOnly={isValidCode}
            />
            <IsValidBtn
              text="인증"
              onClick={handleConfirmCode}
              isValid={isValidCode}
              disabled={isValidCode}
            />
          </div>
        </div>
      )}
      <div className="flex flex-col my-1">
        <label htmlFor="nickname" className="text-xs sm:text-sm">
          닉네임
        </label>
        <div className="flex items-center">
          <input
            className={BASIC_INPUT_STYLE}
            type="text"
            id="nickname"
            name="nickname"
            value={signupData.nickname}
            onChange={handleChange}
            required
            placeholder="4~14자리 (영어, 숫자 : 1자, 한글 : 2자)"
          />
          <IsValidBtn
            text="중복확인"
            onClick={handleIsValidNickname}
            isValid={isValidNickname}
          />
        </div>
      </div>
      {loginType === 'employeer' && (
        <div className="flex flex-col my-1">
          <label htmlFor="company" className="text-xs sm:text-sm">
            회사명
          </label>
          <input
            className={BASIC_INPUT_STYLE}
            type="text"
            id="company"
            name="company"
            value={(signupData as EmployerSignupFormData).company}
            onChange={handleChange}
            required
            placeholder="귀하의 현재 직장의 이름을 입력해 주세요."
          />
        </div>
      )}
      <div className="flex flex-col my-1">
        <label htmlFor="pw" className="text-xs sm:text-sm">
          비밀번호
        </label>
        <input
          className={BASIC_INPUT_STYLE}
          type="password"
          id="pw"
          name="pw"
          value={signupData.pw}
          onChange={handleChange}
          required
          placeholder="8~15자리 (영어, 숫자, 특수문자(@$!%*#?&)) 포함)"
        />
      </div>
      <div className="flex flex-col my-1">
        <label htmlFor="confirmPw" className="text-xs sm:text-sm">
          비밀번호 확인
        </label>
        <input
          className={BASIC_INPUT_STYLE}
          type="password"
          id="confirmPw"
          name="confirmPw"
          value={signupData.confirmPw}
          onChange={handleChange}
          required
          placeholder="입력한 비밀번호를 다시 입력해주세요."
        />
      </div>
      <BlueBtn text="회원가입" onClick={() => {}} extraStyle="my-5" />
      <div className="flex items-center justify-center">
        <p className="mr-3 text-xs text-soma-grey-50 sm:text-sm">
          계정이 이미 있나요?
        </p>
        <Link
          href="/login"
          className="self-end my-2 text-sm font-semibold text-soma-blue-50 sm:text-base"
        >
          로그인하기
        </Link>
      </div>
    </form>
  );
}
