'use client';

import { FormEvent, useState } from 'react';
import BlueBtn from '../shared/btn/BlueBtn';
import { useRouter } from 'next/navigation';

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
        className="border-2 my-2 py-2 px-4 rounded-lg bg-soma-grey-20 border-soma-grey-30 text-sm sm:text-base outline-none"
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
