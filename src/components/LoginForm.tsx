'use client';

import { login } from '@/service/auth';
import { LoginFormData } from '@/types';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import BlueBtn from './shared/BlueBtn';
import PromptgMessage from './shared/PromptMessage';

const INPUT_STYLE =
  'text-lg border-2 my-2 py-2 px-4 rounded-lg bg-soma-grey-20 border-soma-grey-30 text-sm sm:text-base';

export default function LoginForm() {
  const router = useRouter();
  const [loginData, setLoginData] = useState<LoginFormData>({
    email: '',
    pw: '',
  });

  const [messageText, setMessageText] = useState('');
  const [messageType, setMessageType] = useState(false); // true : 성공 메시지  false : 경고 메시지
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setLoginData((info) => ({ ...info, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ user_email: loginData.email, user_pw: loginData.pw }).then(
      (data) => {
        showMessage(data.message, data.isSuccess);
        if (data.isSuccess) {
          router.push('/');
          router.refresh();
        }
      }
    );
  };

  const showMessage = (text: string, type: boolean) => {
    setMessageText(text);
    setMessageType(type);
    setIsMessageVisible(true);
    setTimeout(() => {
      setIsMessageVisible(false);
    }, 2000);
  };

  return (
    <form className="flex flex-col w-full" onSubmit={handleSubmit}>
      <PromptgMessage
        text={messageText}
        type={messageType}
        isVisible={isMessageVisible}
      />
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
      <BlueBtn text="로그인" onClick={() => {}} extraStyle="my-5" />
    </form>
  );
}
