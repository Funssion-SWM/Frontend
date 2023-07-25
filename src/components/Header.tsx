'use client';

import exampleImg from '../../public/img/wade.jpeg';
import Link from 'next/link';
import { isLogin, logout } from '@/service/auth';
import Image from 'next/image';
import { useRef } from 'react';
import { useDetectOutsideClick } from '@/hooks/useDeleteOutsideClick';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const dropdownRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

  return (
    <header className="flex justify-between items-center py-4 border-b-2">
      <Link href="/">
        <h1 className="text-3xl font-bold">SOMA</h1>
      </Link>
      {/* <nav className="flex gap-4">
        <Link href="/memos">Memos</Link>
        <Link href="/stories">Stories</Link>
      </nav> */}
      {isLogin() ? (
        <nav className="flex items-center gap-3 relative" ref={dropdownRef}>
          <button onClick={() => setIsActive((pre) => !pre)}>
            <Image
              src={exampleImg}
              alt="exampleImg"
              height={30}
              className="rounded-full"
            />
          </button>
          <nav
            className={`absolute top-10 bg-white flex flex-col gap-1 rounded-lg shadow-inner ${
              isActive ? 'visible' : 'invisible'
            }`}
          >
            <button
              className="hover:bg-gray-200 p-2 rounded-t-lg"
              onClick={() => {
                router.push('/me');
                setIsActive(false);
              }}
            >
              프로필
            </button>
            <button
              className="hover:bg-gray-200 p-2 rounded-b-lg"
              onClick={() => {
                logout();
                router.refresh();
                setIsActive(false);
              }}
            >
              로그아웃
            </button>
          </nav>
          <button
            className=" bg-blue-500 text-white px-3 py-1 rounded-2xl"
            onClick={() => {
              router.push('/create/memo');
              setIsActive(false);
            }}
          >
            + 글쓰기
          </button>
        </nav>
      ) : (
        <Link href="/login">
          <button className=" bg-blue-500 text-white px-2 py-1 rounded-2xl">
            회원가입/로그인
          </button>
        </Link>
      )}
    </header>
  );
}
