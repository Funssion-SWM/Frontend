'use client';

import BlueBtn from '@/components/shared/btn/BlueBtn';
import IsValidBtn from '@/components/shared/btn/IsValidBtn';
import { checkNickname, registerNickname } from '@/service/auth';
import { validateNickname } from '@/utils/validation';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import logo from '@/assets/inforum_logo.png';
import { notifyToast } from '@/utils/notify';

type Props = {
  userId: number;
};

export default function NicknameForm({ userId }: Props) {
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [isValidNickname, setIsValidNickname] = useState(false);

  const handleIsValidNickname = () => {
    if (!validateNickname(nickname)) {
      notifyToast(
        '닉네임 형식에 맞지 않습니다. 닉네임 형식 : 4~14자리 (영어, 숫자 : 1자, 한글 : 2자)',
        'error'
      );
      setIsValidNickname(false);
      return;
    }

    checkNickname(nickname).then((data) => {
      notifyToast(data.message, data.valid ? 'success' : 'error');
      setIsValidNickname(data.valid ? true : false);
    });
  };

  const handleClick = () => {
    if (!isValidNickname) {
      notifyToast('닉네임 설정에 문제가 있습니다.', 'error');
      return;
    }

    registerNickname(nickname, userId).then(() => {
      router.push(`/signup/setting/${userId}`);
    });
  };

  return (
    <section className="flex flex-col w-full items-center max-w-screen-sm mx-auto mt-32 py-5 px-10 sm:px-32">
      <Image src={logo} alt="logo" width={200} className="mb-10" />
      <div className="flex flex-col my-1 w-full">
        <label htmlFor="nickname" className="text-xs sm:text-sm">
          닉네임
        </label>
        <div className="flex items-center">
          <input
            className="border-2 my-2 py-2 px-4 rounded-lg bg-soma-grey-20 border-soma-grey-30 grow text-sm sm:text-base"
            type="text"
            id="nickname"
            name="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
            placeholder="4~14자리 (영어, 숫자 : 1자, 한글 : 2자)"
          />
          <IsValidBtn
            text="중복확인"
            onClick={handleIsValidNickname}
            isValid={isValidNickname}
          />
        </div>
      </div>
      <BlueBtn text="다음" onClick={handleClick} extraStyle="my-5 w-full" />
    </section>
  );
}
