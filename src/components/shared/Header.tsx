'use client';

import basicProfileImg from '../../assets/profile.svg';
import Link from 'next/link';
import { checkUser, getUserInfo, logout } from '@/service/auth';
import Image from 'next/image';
import { useContext, useEffect, useRef, useState } from 'react';
import { useDetectOutsideClick } from '@/hooks/useDeleteOutsideClick';
import { useRouter } from 'next/navigation';
import BlueBtn from './btn/BlueBtn';
import { ModalContext } from '@/context/ModalProvider';

export default function Header() {
  const router = useRouter();
  const dropdownRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [isLogin, setIsLogin] = useState<boolean | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { open } = useContext(ModalContext);

  async function first() {
    await checkUser().then((data) => {
      setIsLogin(data.isLogin);
      data.isLogin &&
        getUserInfo(data.id).then((info) => {
          setImageUrl(info.profileImageFilePath);
        });
    });
  }

  useEffect(() => {
    first();
  }, [isActive, open]);

  return (
    <section className="border-b-2 sticky top-0 bg-white z-10">
      <header className="flex justify-between items-center py-4 px-5 max-w-screen-xl m-auto">
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => {
            router.push('/memos');
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
                src={imageUrl ? imageUrl : basicProfileImg}
                alt="profileImg"
                width={32}
                height={32}
                className="rounded-full w-8 h-8 object-cover"
              />
            </button>

            <nav
              className={`absolute top-10 bg-white flex flex-col gap-1 rounded-lg shadow-inner z-10 ${
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
                className="hover:bg-gray-200 p-2 rounded-t-lg"
                onClick={() => {
                  checkUser().then((data) =>
                    router.push(`/me/${data.id}/drafts`)
                  );
                  setIsActive(false);
                }}
              >
                임시 글
              </button>
              <button
                className="hover:bg-gray-200 p-2 rounded-b-lg"
                onClick={() => {
                  setIsActive(false);
                  open('로그아웃 하시겠습니까?', () => {
                    logout().then(() => {
                      router.push('/memos');
                      router.refresh();
                    });
                  });
                }}
              >
                로그아웃
              </button>
            </nav>
            <BlueBtn
              text={'글쓰기'}
              onClick={() => {
                router.push('/create/memo');
                setIsActive(false);
              }}
            />
          </nav>
        )}
        {isLogin === false && (
          <Link href="/login">
            <BlueBtn text="로그인" onClick={() => {}} />
          </Link>
        )}
      </header>
    </section>
  );
}
