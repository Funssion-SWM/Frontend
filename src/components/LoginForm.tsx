'use client';

import { ChangeEvent, FormEvent, useState } from 'react';

export default function LoginForm() {
  const [loginInfo, setLoginInfo] = useState({ id: '', pw: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;
    setLoginInfo(info => ({ ...info, [id]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(loginInfo);
    setLoginInfo({ id: '', pw: '' });
  };

  return (
    <form className="flex flex-col w-full" onSubmit={handleSubmit}>
      <div className="flex flex-col my-2">
        <label htmlFor="id" className="text-lg">
          아이디
        </label>
        <input
          className="text-2xl border-2"
          type="email"
          id="id"
          value={loginInfo.id}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex flex-col  my-2">
        <label htmlFor="pw" className="text-lg">
          비밀번호
        </label>
        <input
          className="text-2xl border-2"
          type="password"
          id="pw"
          value={loginInfo.pw}
          onChange={handleChange}
          required
        />
      </div>

      <button className="bg-green-400 rounded-lg py-2 my-5 font-bold">
        로그인
      </button>
    </form>
  );
}
