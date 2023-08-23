'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import {
  checkEmailAndSendCode,
  checkNickname,
  confirmCode,
  signUp,
} from '@/service/auth';
import { useRouter } from 'next/navigation';
import { SignupFormData } from '@/types';
import BlueBtn from '../shared/btn/BlueBtn';
import IsValidBtn from '../shared/btn/IsValidBtn';
import PromptgMessage from '../shared/PromptMessage';
import {
  validateEmail,
  validateNickname,
  validatePassword,
} from '@/service/validation';

const INPUT_STYLE =
  'border-2 my-2 py-2 px-4 rounded-lg bg-soma-grey-20 border-soma-grey-30 grow text-sm sm:text-base';

export default function SignupForm() {
  const router = useRouter();
  const [signupData, setSignupData] = useState<SignupFormData>({
    email: '',
    authCode: '',
    pw: '',
    confirmPw: '',
    nickname: '',
  });
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidCode, setIsValidCode] = useState(false);
  const [isValidNickname, setIsValidNickname] = useState(false);

  const [messageText, setMessageText] = useState('');
  const [messageType, setMessageType] = useState(false); // true : 성공 메시지  false : 경고 메시지
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setSignupData((info) => ({ ...info, [name]: value }));
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
      showMessage('중복확인, 인증 처리에 문제가 있습니다.', false);
      return;
    }

    if (!validatePassword(signupData.pw)) {
      showMessage('비밀번호 형식에 맞지 않습니다.', false);
      return;
    }

    if (signupData.pw !== signupData.confirmPw) {
      showMessage('비밀번호가 같지 않습니다.', false);
      return;
    }

    signUp({
      user_name: signupData.nickname,
      login_type: 0,
      user_email: signupData.email,
      user_pw: signupData.pw,
    }).then((data) => router.push(`/signup/setting/${data.id}`));
  };

  const handleIsValidEmail = () => {
    if (!validateEmail(signupData.email)) {
      showMessage('이메일 형식에 맞지 않습니다.', false);
      setIsValidNickname(false);
      return;
    }

    checkEmailAndSendCode(signupData.email).then((data) => {
      setIsValidCode(false);
      showMessage(data.message, data.isSuccess);
      setIsValidEmail(data.isSuccess ? true : false);
    });
  };

  const handleConfirmCode = () => {
    confirmCode(signupData.email, signupData.authCode).then((data) => {
      showMessage(data.message, data.valid);
      setIsValidCode(data.valid ? true : false);
    });
  };

  const handleIsValidNickname = () => {
    if (!validateNickname(signupData.nickname)) {
      showMessage('닉네임 형식에 맞지 않습니다.', false);
      setIsValidNickname(false);
      return;
    }

    checkNickname(signupData.nickname).then((data) => {
      showMessage(data.message, data.valid);
      setIsValidNickname(data.valid ? true : false);
    });
  };

  const showMessage = (text: string, type: boolean) => {
    setMessageText(text);
    setMessageType(type);
    setIsMessageVisible(true);
    setTimeout(() => {
      setIsMessageVisible(false);
    }, 2000);
  };

  return (
    <form className="flex flex-col w-full" onSubmit={handleSubmit}>
      <PromptgMessage
        text={messageText}
        type={messageType}
        isVisible={isMessageVisible}
      />
      <div className="flex flex-col my-1">
        <label htmlFor="email" className="text-xs sm:text-sm">
          이메일
        </label>
        <div className="flex items-center">
          <input
            className={INPUT_STYLE}
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
              className={INPUT_STYLE}
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
            className={INPUT_STYLE}
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
      <div className="flex flex-col  my-1">
        <label htmlFor="pw" className="text-xs sm:text-sm">
          비밀번호
        </label>
        <input
          className={INPUT_STYLE}
          type="password"
          id="pw"
          name="pw"
          value={signupData.pw}
          onChange={handleChange}
          required
          placeholder="8~20자리 (영어, 숫자, 특수문자(@$!%*#?&)) 포함)"
        />
      </div>
      <div className="flex flex-col  my-1">
        <label htmlFor="confirmPw" className="text-xs sm:text-sm">
          비밀번호 확인
        </label>
        <input
          className={INPUT_STYLE}
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
    </form>
  );
}
