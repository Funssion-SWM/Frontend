'use client';

import { ACCESS_TOKEN, LoginFormData, login, saveToken } from '@/service/auth';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function LoginForm() {
  const router = useRouter();
  const [loginData, setLoginData] = useState<LoginFormData>({
    email: '',
    pw: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setLoginData((info) => ({ ...info, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ user_email: loginData.email, user_pw: loginData.pw })
      .then((res) => {
        if (!res.ok) {
          throw new Error('error');
        }
        router.push('/');
        return res.json();
      })
      .then((data) => saveToken(ACCESS_TOKEN, data.token))
      .catch(console.error);
  };

  return (
    <form className="flex flex-col w-full" onSubmit={handleSubmit}>
      <div className="flex flex-col my-2">
        <label htmlFor="email" className="text-lg">
          이메일
        </label>
        <input
          className="text-2xl border-2"
          type="email"
          id="email"
          name="email"
          value={loginData.email}
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
