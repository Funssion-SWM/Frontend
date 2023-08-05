'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import WarningMessage from './shared/WarningMessage';
import {
  checkEmail,
  checkNickname,
  confirmCode,
  sendCodeToEmail,
  signUp,
} from '@/service/auth';
import { useRouter } from 'next/navigation';
import { SignupFormData } from '@/types';
import BlueBtn from './shared/BlueBtn';
import LightBlueBtn from './shared/LightBlueBtn';

const INPUT_STYLE =
  'border-2 my-2 py-2 px-4 rounded-lg bg-soma-grey-20 border-soma-grey-30 grow';

export default function SignupForm() {
  const router = useRouter();
  const [signupData, setSignupData] = useState<SignupFormData>({
    email: '',
    authCode: '',
    pw: '',
    confirmPw: '',
    nickname: '',
  });
  const [msgFlag1, setMsgFlag1] = useState(false);
  const [msgFlag2, setMsgFlag2] = useState(false);
  const [msgFlag3, setMsgFlag3] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setSignupData((info) => ({ ...info, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (signupData.pw !== signupData.confirmPw) {
      setMsgFlag3(true);
      setTimeout(() => {
        setMsgFlag3(false);
      }, 2000);
      return;
    }

    signUp({
      user_name: signupData.nickname,
      login_type: 0,
      user_email: signupData.email,
      user_pw: signupData.pw,
    }).then(() => router.push('/login'));
  };

  const handleIsDuplicate1 = () => {
    checkEmail(signupData.email).then(console.log).catch(console.error);
    setMsgFlag1(true);
    setTimeout(() => {
      setMsgFlag1(false);
    }, 2000);
  };

  const handleIsDuplicate2 = () => {
    checkNickname(signupData.nickname).then(console.log).catch(console.error);
    setMsgFlag2(true);
    setTimeout(() => {
      setMsgFlag2(false);
    }, 2000);
  };

  const handleSendCode = () => {
    sendCodeToEmail(signupData.email).then(console.log).catch(console.error);
  };

  const handleConfirmCode = () => {
    confirmCode(signupData.authCode).then(console.log).catch(console.error);
  };

  return (
    <form className="flex flex-col w-full" onSubmit={handleSubmit}>
      <div className="flex flex-col my-1">
        <label htmlFor="email" className="text-sm">
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
          />
          <LightBlueBtn text="중복확인" onClick={handleIsDuplicate1} />
          {/* <LightBlueBtn text="보내기" onClick={handleSendCode} /> */}
        </div>
      </div>
      {msgFlag1 && <WarningMessage text="중복되는 이메일입니다." />}
      <div className="flex flex-col my-1">
        <label htmlFor="authCode" className="text-sm">
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
          />
          <LightBlueBtn text="인증" onClick={handleConfirmCode} />
        </div>
      </div>
      <div className="flex flex-col my-1">
        <label htmlFor="nickname" className="text-sm">
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
            placeholder="활동할 닉네임을 입력해주세요."
          />
          <LightBlueBtn text="중복확인" onClick={handleIsDuplicate2} />
        </div>
      </div>
      {msgFlag2 && <WarningMessage text="중복되는 닉네임입니다." />}
      <div className="flex flex-col  my-1">
        <label htmlFor="pw" className="text-sm">
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
          placeholder="비밀번호를 입력해주세요."
        />
      </div>
      <div className="flex flex-col  my-1">
        <label htmlFor="confirmPw" className="text-sm">
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
      {msgFlag3 && <WarningMessage text="비밀번호가 같지 않습니다." />}

      <BlueBtn text="회원가입" onClick={() => {}} extraStyle="my-5" />
    </form>
  );
}
