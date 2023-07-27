'use client';

import exampleImg from '../../public/img/profile.png';
import Link from 'next/link';
import { checkUser, logout } from '@/service/auth';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useDetectOutsideClick } from '@/hooks/useDeleteOutsideClick';
import { useRouter } from 'next/navigation';
import BlueBtn from './BlueBtn';

export default function Header() {
  const router = useRouter();
  const dropdownRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [isLogin, setIsLogin] = useState(null);

  useEffect(() => {
    async function first() {
      1;
      await checkUser()
        .then((res) => {
          // if (!res.ok) throw new Error('error!!');
          console.log(res);
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setIsLogin(data.isLogin);
        })
        .catch((err) => console.error(err));
    }
    first();
  }, [isActive]);

  return (
    <header className=" border-b-2">
      <div className="flex justify-between items-center py-4 px-10 max-w-screen-xl m-auto">
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
                  checkUser()
                    .then((res) => {
                      if (!res.ok) throw new Error('error!!');
                      return res.json();
                    })
                    .then((data) => {
                      router.push(`/me/${data.id}`);
                    })
                    .catch(console.error);
                  setIsActive(false);
                }}
              >
                프로필
              </button>
              <button
                className="hover:bg-gray-200 p-2 rounded-b-lg"
                onClick={() => {
                  logout()
                    .then((res) => {
                      console.log(res);
                      if (!res.ok) throw new Error('error!!');
                      setIsActive(false);
                      router.push('/');
                      router.refresh();
                    })
                    .catch(console.error);
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
            <button className=" bg-blue-500 text-white px-2 py-1 rounded-2xl">
              회원가입/로그인
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}
