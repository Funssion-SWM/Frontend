'use client';

import Link from 'next/link';
import googleIcon from '@/assets/icons/google_icon.svg';

import Image from 'next/image';

export default function GoogleLoginBtn() {
  return (
    <Link
      href={`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/oauth2/authorization/google`}
      className="w-full"
    >
      <button
        className={`flex w-full justify-between items-center px-3.5 py-2 rounded-3xl transition border-2 border-soma-grey-30 hover:bg-soma-grey-20 text-sm sm:text-base`}
        onClick={() => {}}
      >
        <Image src={googleIcon} alt="googleIcon" width={20} height={20} />
        <p>구글 계정 로그인</p>
        <div className="w-5 h-5"></div>
      </button>
    </Link>
  );
}
