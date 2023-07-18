'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import WarningMessage from './WarningMessage';
import {
  SignupFormData,
  checkEmail,
  checkNickname,
  confirmCode,
  sendCodeToEmail,
  signUp,
} from '@/service/auth';

export default function SignupForm() {
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
    })
      .then(console.log)
      .catch(console.error);

    setSignupData({
      email: '',
      authCode: '',
      pw: '',
      confirmPw: '',
      nickname: '',
    });
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
      <div className="flex flex-col my-2">
        <label htmlFor="email" className="text-lg">
          이메일
        </label>
        <div className="flex">
          <input
            className="text-2xl border-2 grow"
            type="email"
            id="email"
            name="email"
            value={signupData.email}
            onChange={handleChange}
            required
          />
          <button
            className="bg-green-400 rounded-lg mx-2 px-2 font-bold"
            onClick={handleIsDuplicate1}
          >
            중복확인
          </button>
          <button
            className="bg-green-400 rounded-lg mx-2 px-2 font-bold"
            onClick={handleSendCode}
          >
            보내기
          </button>
        </div>
      </div>
      {msgFlag1 && <WarningMessage text="중복되는 이메일입니다." />}
      <div className="flex flex-col my-2">
        <label htmlFor="authCode" className="text-lg">
          인증번호
        </label>
        <div className="flex">
          <input
            className="text-2xl border-2 grow"
            type="text"
            id="authCode"
            name="authCode"
            value={signupData.authCode}
            onChange={handleChange}
            required
          />
          <button
            className="bg-green-400 rounded-lg mx-2 px-2 font-bold"
            onClick={handleConfirmCode}
          >
            확인
          </button>
        </div>
      </div>
      <div className="flex flex-col  my-2">
        <label htmlFor="nickname" className="text-lg">
          닉네임
        </label>
        <div className="flex">
          <input
            className="text-2xl border-2 grow"
            type="text"
            id="nickname"
            name="nickname"
            value={signupData.nickname}
            onChange={handleChange}
            required
          />
          <button
            className="bg-green-400 rounded-lg mx-2 px-2 font-bold"
            onClick={handleIsDuplicate2}
          >
            중복확인
          </button>
        </div>
      </div>
      {msgFlag2 && <WarningMessage text="중복되는 닉네임입니다." />}
      <div className="flex flex-col  my-2">
        <label htmlFor="pw" className="text-lg">
          비밀번호
        </label>
        <input
          className="text-2xl border-2"
          type="password"
          id="pw"
          name="pw"
          value={signupData.pw}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex flex-col  my-2">
        <label htmlFor="confirmPw" className="text-lg">
          비밀번호 확인
        </label>
        <input
          className="text-2xl border-2"
          type="password"
          id="confirmPw"
          name="confirmPw"
          value={signupData.confirmPw}
          onChange={handleChange}
          required
        />
      </div>
      {msgFlag3 && <WarningMessage text="비밀번호가 같지 않습니다." />}
      <button className="bg-green-400 rounded-lg py-2 my-5 font-bold">
        회원가입
      </button>
    </form>
  );
}
