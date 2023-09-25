'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import BlueBtn from '../shared/btn/BlueBtn';
import IsValidBtn from '../shared/btn/IsValidBtn';
import { BASIC_INPUT_STYLE } from '@/utils/tailwindcss';
import { FindPasswrdFormData } from '@/types';
import { validateEmail, validatePassword } from '@/service/validation';
import { toast } from 'react-toastify';
import {
  changePassword,
  checkEmailAndSendCode,
  confirmCode,
} from '@/service/auth';
import { useRouter } from 'next/navigation';

export default function FindPasswordForm() {
  const router = useRouter();
  const [findPasswordData, setFindPasswordData] = useState<FindPasswrdFormData>(
    {
      email: '',
      authCode: '',
      pw: '',
      confirmPw: '',
    }
  );
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidCode, setIsValidCode] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFindPasswordData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(isValidEmail && isValidCode)) {
      toast('이메일 인증을 해주세요.', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error',
      });
      return;
    }

    if (!validatePassword(findPasswordData.pw)) {
      toast('비밀번호 형식에 맞지 않습니다.', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error',
      });
      return;
    }

    if (findPasswordData.pw !== findPasswordData.confirmPw) {
      toast('비밀번호가 같지 않습니다.', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error',
      });
      return;
    }

    changePassword(
      findPasswordData.email,
      findPasswordData.authCode,
      findPasswordData.pw
    ).then((data) => {
      toast(data.message, {
        hideProgressBar: true,
        autoClose: 2000,
        type: data.isSuccess ? 'success' : 'error',
      });
      data.isSuccess && router.push('/login');
    });
  };

  const handleIsValidEmail = () => {
    if (findPasswordData.email.length === 0) {
      toast('이메일을 입력해주세요.', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error',
      });
      return;
    }

    if (!validateEmail(findPasswordData.email)) {
      toast('이메일 형식에 맞지 않습니다', {
        hideProgressBar: true,
        autoClose: 2000,
        type: 'error',
      });
      setIsValidEmail(false);
      return;
    }

    checkEmailAndSendCode(findPasswordData.email, 'find').then((data) => {
      setIsValidCode(false);
      toast(data.message, {
        hideProgressBar: true,
        autoClose: 2000,
        type: data.isSuccess ? 'success' : 'error',
      });
      setIsValidEmail(data.isSuccess ? true : false);
    });
  };

  const handleConfirmCode = () => {
    confirmCode(findPasswordData.email, findPasswordData.authCode).then(
      (data) => {
        toast(data.message, {
          hideProgressBar: true,
          autoClose: 2000,
          type: data.valid ? 'success' : 'error',
        });
        setIsValidCode(data.valid ? true : false);
      }
    );
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
            value={findPasswordData.email}
            onChange={handleChange}
            required
            placeholder="이메일"
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
            value={findPasswordData.authCode}
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
      <div className="flex flex-col  my-1">
        <label htmlFor="pw" className="text-xs sm:text-sm">
          비밀번호
        </label>
        <input
          className={BASIC_INPUT_STYLE}
          type="password"
          id="pw"
          name="pw"
          value={findPasswordData.pw}
          onChange={handleChange}
          required
          placeholder="8~15자리 (영어, 숫자, 특수문자(@$!%*#?&)) 포함)"
        />
      </div>
      <div className="flex flex-col  my-1">
        <label htmlFor="confirmPw" className="text-xs sm:text-sm">
          비밀번호 확인
        </label>
        <input
          className={BASIC_INPUT_STYLE}
          type="password"
          id="confirmPw"
          name="confirmPw"
          value={findPasswordData.confirmPw}
          onChange={handleChange}
          required
          placeholder="입력한 비밀번호를 다시 입력해주세요."
        />
      </div>

      <BlueBtn
        text="비밀번호 변경"
        onClick={() => {}}
        size="big"
        extraStyle="my-2"
      />
    </form>
  );
}
