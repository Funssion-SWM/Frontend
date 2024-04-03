'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaMedal } from '@react-icons/all-files/fa/FaMedal';
import BlueBtn from '../btn/BlueBtn';
import { useRouter } from 'next/navigation';
import { Search } from '@/assets/svg';

export default function Submenu2() {
  const router = useRouter();

  return (
    <nav className="absolute flex items-center gap-3 right-1 sm:right-3">
      <Link
        href="/guide"
        className={`font-semibold text-soma-grey-50 hover:text-soma-blue-40 transition-all text-sm`}
        prefetch={false}
      >
        에디터 체험
      </Link>
      <button onClick={() => router.push('/search/form')}>
        <Image className="cursor-pointer" src={Search} alt="search-icon" />
      </button>
      <button onClick={() => router.push('/ranking')} aria-label="ranking">
        <FaMedal className="w-5 h-5 text-soma-grey-60" />
      </button>
      <Link href="/login">
        <BlueBtn text="로그인" onClick={() => {}} />
      </Link>
    </nav>
  );
}
