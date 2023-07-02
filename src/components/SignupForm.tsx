'use client';

import { ChangeEvent, FormEvent, useState } from 'react';

type SignupData = {
  id: string;
  authCode: string;
  pw: string;
  confirmPw: string;
  nickname: string;
};

export default function SignupForm() {
  const [signupData, setSignupData] = useState<SignupData>({
    id: '',
    authCode: '',
    pw: '',
    confirmPw: '',
    nickname: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setSignupData(info => ({ ...info, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(signupData);
    setSignupData({
      id: '',
      authCode: '',
      pw: '',
      confirmPw: '',
      nickname: '',
    });
  };

  return (
    <form className="flex flex-col w-full" onSubmit={handleSubmit}>
      <div className="flex flex-col my-2">
        <label htmlFor="id" className="text-lg">
          이메일
        </label>
        <div className="flex">
          <input
            className="text-2xl border-2 grow"
            type="email"
            id="id"
            name="id"
            value={signupData.id}
            onChange={handleChange}
            required
          />
          <button className="bg-green-400 rounded-lg mx-2 px-2 font-bold">
            중복확인
          </button>
        </div>
      </div>
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
          <button className="bg-green-400 rounded-lg mx-2 px-2 font-bold">
            확인
          </button>
        </div>
      </div>
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
      <div className="flex flex-col  my-2">
        <label htmlFor="nickname" className="text-lg">
          닉네임
        </label>
        <input
          className="text-2xl border-2"
          type="text"
          id="nickname"
          name="nickname"
          value={signupData.nickname}
          onChange={handleChange}
          required
        />
      </div>

      <button className="bg-green-400 rounded-lg py-2 my-5 font-bold">
        회원가입
      </button>
    </form>
  );
}
