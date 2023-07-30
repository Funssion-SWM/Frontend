'use client';

import { LoginFormData, login } from '@/service/auth';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

const INPUT_STYLE =
  'text-lg border-2 my-2 py-2 px-4 rounded-lg bg-soma-grey-20 border-soma-grey-30';

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
    login({ user_email: loginData.email, user_pw: loginData.pw }).then(() => {
      router.push('/');
      router.refresh();
    });
  };

  return (
    <form className="flex flex-col w-full" onSubmit={handleSubmit}>
      <input
        className={INPUT_STYLE}
        type="email"
        id="email"
        name="email"
        value={loginData.email}
        onChange={handleChange}
        required
        placeholder="이메일"
      />
      <input
        className={INPUT_STYLE}
        type="password"
        id="pw"
        name="pw"
        value={loginData.pw}
        onChange={handleChange}
        required
        placeholder="비밀번호"
      />
      <button className="bg-soma-blue-40 text-soma-white rounded-3xl py-3 my-5 font-bold">
        로그인
      </button>
    </form>
  );
}
