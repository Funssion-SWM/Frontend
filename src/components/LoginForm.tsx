'use client';

import { ChangeEvent, FormEvent, useState } from 'react';

type LoginData = {
  id: string;
  pw: string;
};

export default function LoginForm() {
  const [loginData, setLoginData] = useState<LoginData>({ id: '', pw: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setLoginData(info => ({ ...info, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(loginData);
    setLoginData({ id: '', pw: '' });
  };

  return (
    <form className="flex flex-col w-full" onSubmit={handleSubmit}>
      <div className="flex flex-col my-2">
        <label htmlFor="id" className="text-lg">
          이메일
        </label>
        <input
          className="text-2xl border-2"
          type="email"
          id="id"
          name="id"
          value={loginData.id}
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
          name="pw"
          value={loginData.pw}
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
