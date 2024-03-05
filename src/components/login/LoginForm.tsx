'use client';

import { login } from '@/service/auth';
import { LoginFormData } from '@/types/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import BlueBtn from '../shared/btn/BlueBtn';
import { BASIC_INPUT_STYLE } from '@/constants/style';
import { notifyToast } from '@/utils/notify';
import { MAIN_PATH } from '@/constants/general';

export default function LoginForm() {
  const router = useRouter();
  const duplicate = useSearchParams()?.get('duplicate');
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

  useEffect(() => {
    if (duplicate === 'true')
      notifyToast('이미 일반 회원가입으로 등록된 계정입니다.', 'error');
  }, []);

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
