'use client';

import { FormEvent, useState } from 'react';
import BlueBtn from '../shared/btn/BlueBtn';
import { useRouter } from 'next/navigation';
import { BASIC_INPUT_STYLE } from '@/constants/style';

export default function FindEmailForm() {
  const [nickname, setNickname] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/find/email/${nickname}`);
  };

  return (
    <form className="flex flex-col w-full" onSubmit={handleSubmit}>
      <input
        className={BASIC_INPUT_STYLE}
        type="nickname"
        id="nickname"
        name="nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        required
        placeholder="닉네임"
      />
      <BlueBtn
        text="이메일 찾기"
        onClick={() => {}}
        size="big"
        extraStyle="my-2"
      />
    </form>
  );
}
