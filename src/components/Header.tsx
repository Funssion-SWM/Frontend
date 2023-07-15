'use client';

import Link from 'next/link';
import { HiPencil } from 'react-icons/hi';
import { BsFillPersonFill } from 'react-icons/bs';
import { logout } from '@/service/auth';

export default function Header() {
  return (
    <header className="flex justify-between items-center bg-gray-100 px-10 py-4">
      <Link href="/">
        <h1 className="text-xl font-bold">LOGO</h1>
      </Link>
      <nav className="flex gap-4">
        <Link href="/memos">Memos</Link>
        <Link href="/stories">Stories</Link>
      </nav>
      <nav className="flex items-center gap-3 text-lg">
        <Link href="/create/memo">
          <HiPencil />
        </Link>
        <Link href="/">
          <BsFillPersonFill />
        </Link>
        <Link href="/login">
          <button className=" bg-black text-white px-2 rounded-lg">
            로그인
          </button>
        </Link>
        <button
          className=" bg-black text-white px-2 rounded-lg"
          onClick={() => logout()}
        >
          로그아웃
        </button>
      </nav>
    </header>
  );
}
