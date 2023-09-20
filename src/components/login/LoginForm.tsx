'use client';

import { login } from '@/service/auth';
import { LoginFormData } from '@/types';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import BlueBtn from '../shared/btn/BlueBtn';
import PromptgMessage from '../shared/PromptMessage';
import { useMessage } from '@/hooks/useMessage';

const INPUT_STYLE =
  'text-lg border-2 my-2 py-2 px-4 rounded-lg bg-soma-grey-20 border-soma-grey-30 text-sm sm:text-base';

export default function LoginForm() {
  const router = useRouter();
  const [loginData, setLoginData] = useState<LoginFormData>({
    email: '',
    pw: '',
  });
  const [messageProperty, showMessage] = useMessage();

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
      showMessage(data.message, data.isSuccess ? 'success' : 'fail');
      if (data.isSuccess) {
        router.push('/memos');
        router.refresh();
      }
    });
  };

  return (
    <form className="flex flex-col w-full" role="form" onSubmit={handleSubmit}>
      <PromptgMessage property={messageProperty} />
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
      <BlueBtn text="로그인" onClick={() => {}} size="big" extraStyle="my-2" />
    </form>
  );
}
