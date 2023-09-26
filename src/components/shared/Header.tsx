'use client';

import basicProfileImg from '../../assets/profile.svg';
import Link from 'next/link';
import { checkUser, logout } from '@/service/auth';
import searchIcon from '@/assets/icons/icon_search_32.svg';
import Image from 'next/image';
import { useContext, useRef } from 'react';
import { useDetectOutsideClick } from '@/hooks/useDeleteOutsideClick';
import { useRouter } from 'next/navigation';
import BlueBtn from './btn/BlueBtn';
import { ModalContext } from '@/context/ModalProvider';
import logo from '@/assets/inforum_logo.png';
import { useScrollDirection } from '@/hooks/useScrollDirection';

type Props = {
  isLogin: boolean;
  profileImageFilePath: string | undefined;
};

export default function Header({ isLogin, profileImageFilePath }: Props) {
  const router = useRouter();
  const dropdownRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const { open } = useContext(ModalContext);
  const scrollDirection = useScrollDirection();

  return (
    <header
      className={`border-b-[1px] border-soma-grey-40 sticky top-0 bg-white z-10 transition-all ease-in-out duration-300 ${
        scrollDirection === 'down' && 'opacity-0 invisible'
      }`}
    >
      <div className="flex justify-between items-center py-4 px-5 max-w-screen-xl m-auto h-[70px]">
        <Image
          src={logo}
          alt="logo"
          width={120}
          onClick={() => {
            router.push('/memos');
            router.refresh();
          }}
          className="cursor-pointer"
        />
        {isLogin ? (
          <nav className="flex items-center gap-3 relative" ref={dropdownRef}>
            <button onClick={() => router.push('/search/form')}>
              <Image
                className="cursor-pointer"
                src={searchIcon}
                alt="search_icon"
              />
            </button>

            <button onClick={() => setIsActive((pre) => !pre)}>
              <Image
                src={profileImageFilePath ?? basicProfileImg}
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
                  checkUser().then((data) => {
                    router.push(`/me/${data.id}`);
                    router.refresh();
                  });
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
        ) : (
          <nav className="flex items-center gap-3">
            <button onClick={() => router.push('/search/form')}>
              <Image
                className="cursor-pointer"
                src={searchIcon}
                alt="search_icon"
              />
            </button>
            <Link href="/login">
              <BlueBtn text="로그인" onClick={() => {}} />
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
