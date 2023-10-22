'use client';

import { login } from '@/service/auth';
import { LoginFormData } from '@/types';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import BlueBtn from '../shared/btn/BlueBtn';
import { BASIC_INPUT_STYLE } from '@/utils/tailwindcss';
import { notifyToast } from '@/service/notify';
import { MAIN_PATH } from '@/utils/const';

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
    const formdata = new FormData();
    formdata.append('username', loginData.email);
    formdata.append('password', loginData.pw);
    login(formdata).then((data) => {
      notifyToast(data.message, data.isSuccess ? 'success' : 'error');
      if (data.isSuccess) {
        router.push(MAIN_PATH);
        router.refresh();
      }
    });
  };

  return (
    <form className="flex flex-col w-full" role="form" onSubmit={handleSubmit}>
      <input
        className={BASIC_INPUT_STYLE}
        type="email"
        id="email"
        name="email"
        value={loginData.email}
        onChange={handleChange}
        required
        placeholder="이메일"
      />
      <input
        className={BASIC_INPUT_STYLE}
        type="password"
        id="pw"
        name="pw"
        value={loginData.pw}
        onChange={handleChange}
        required
        placeholder="비밀번호"
      />
      <BlueBtn text="로그인" onClick={() => {}} size="big" extraStyle="my-2" />
    </form>
  );
}
