'use client';

import exampleImg from '../../../public/img/profile.png';
import Link from 'next/link';
import { checkUser, getUserInfo2, logout } from '@/service/auth';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useDetectOutsideClick } from '@/hooks/useDeleteOutsideClick';
import { useRouter } from 'next/navigation';
import BlueBtn from './BlueBtn';

export default function Header() {
  const router = useRouter();
  const dropdownRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  const [imageUrl, setImageUrl] = useState(null);

  async function first() {
    await checkUser().then((data) => {
      setIsLogin(data.isLogin);
      getUserInfo2(data.id).then((info) =>
        setImageUrl(info.profileImageFilePath)
      );
    });
  }

  useEffect(() => {
    first();
  }, [isActive]);

  return (
    <section className="border-b-2">
      <header className="flex justify-between items-center py-4 px-5 max-w-screen-xl m-auto">
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => {
            router.push('/');
            router.refresh();
          }}
        >
          Inforum
        </h1>

        {/* <nav className="flex gap-4">
        <Link href="/memos">Memos</Link>
        <Link href="/stories">Stories</Link>
      </nav> */}
        {isLogin === true && (
          <nav className="flex items-center gap-3 relative" ref={dropdownRef}>
            {imageUrl && (
              <button onClick={() => setIsActive((pre) => !pre)}>
                <Image
                  src={imageUrl}
                  alt="profileImg"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </button>
            )}

            <nav
              className={`absolute top-10 bg-white flex flex-col gap-1 rounded-lg shadow-inner ${
                isActive ? 'visible' : 'invisible'
              }`}
            >
              <button
                className="hover:bg-gray-200 p-2 rounded-t-lg"
                onClick={() => {
                  checkUser().then((data) => router.push(`/me/${data.id}`));
                  setIsActive(false);
                }}
              >
                프로필
              </button>
              <button
                className="hover:bg-gray-200 p-2 rounded-b-lg"
                onClick={() => {
                  logout().then(() => {
                    setIsActive(false);
                    router.push('/');
                    router.refresh();
                  });
                }}
              >
                로그아웃
              </button>
            </nav>
            <BlueBtn
              text={'+글쓰기'}
              onClick={() => {
                router.push('/create/memo');
                setIsActive(false);
              }}
            />
          </nav>
        )}
        {isLogin === false && (
          <Link href="/login">
            <BlueBtn text="회원가입/로그인" onClick={() => {}} />
          </Link>
        )}
      </header>
    </section>
  );
}
