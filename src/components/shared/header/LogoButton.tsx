'use client';

import { MAIN_PATH } from '@/constants/general';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import logo from '@/assets/images/inforum_logo.png';

export default function LogoButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        router.push(MAIN_PATH);
        router.refresh();
      }}
      className="absolute cursor-pointer left-1"
    >
      <Image
        src={logo}
        alt="logo"
        className="sm:left-3 w-[90px] sm:w-[120px]"
      />
    </button>
  );
}
