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
import { CreationModalContext } from '@/context/CreationModalProvider';

type Props = {
  isLogin: boolean;
  profileImageFilePath: string | undefined;
  currentPage?: 'memos' | 'questions';
};

export default function Header({
  isLogin,
  profileImageFilePath,
  currentPage,
}: Props) {
  const router = useRouter();
  const dropdownRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const { open } = useContext(ModalContext);
  const { openCreationModal } = useContext(CreationModalContext);
  const scrollDirection = useScrollDirection();

  return (
    <header
      className={`sticky top-0 bg-white z-10 transition-all ease-in-out duration-300 ${
        scrollDirection === 'down' && 'opacity-0 invisible'
      }`}
    >
      <div className="flex justify-between items-center py-4 px-1 sm:px-5 max-w-screen-xl m-auto h-[70px]">
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
        <div className="sm:flex gap-4 font-semibold text-soma-grey-50 sm:text-lg hidden">
          <Link
            href="/memos"
            className={`${
              currentPage === 'memos' && 'text-soma-blue-40'
            } hover:text-soma-blue-40 transition-all`}
            prefetch={false}
          >
            Memos
          </Link>
          <Link
            href="/questions"
            className={`${
              currentPage === 'questions' && 'text-soma-blue-40'
            } hover:text-soma-blue-40 transition-all`}
            prefetch={false}
          >
            Q&A
          </Link>
        </div>
        {isLogin ? (
          <nav
            className="flex items-center gap-2 sm:gap-3 relative"
            ref={dropdownRef}
          >
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfnkPn7J4uwSP-g3nclOVsx1m4ePUbf_GEpYG1Cpsh2aWgtMQ/viewform?usp=sf_link"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-soma-grey-50 hover:text-soma-blue-40 text-sm"
            >
              이벤트참여
            </a>

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
              className={`absolute top-9 right-[36px] sm:top-10 sm:right-[44px] bg-white flex flex-col gap-1 rounded-lg shadow-inner z-10 ${
                isActive ? 'visible' : 'invisible'
              }`}
            >
              <button
                className="hover:bg-gray-200 p-2 rounded-t-lg tracking-wider px-3"
                onClick={() => {
                  checkUser().then((data) => {
                    router.push(`/me/${data.id}`);
                    router.refresh();
                  });
                  setIsActive(false);
                }}
              >
                마이페이지
              </button>
              <button
                className="hover:bg-gray-200 p-2 tracking-wider px-3"
                onClick={() => {
                  checkUser().then((data) =>
                    router.push(`/me/${data.id}/drafts`)
                  );
                  setIsActive(false);
                }}
              >
                임시글
              </button>
              <button
                className="hover:bg-gray-200 p-2 rounded-b-lg tracking-wider px-3"
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
                openCreationModal();
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
      <div className="sm:hidden gap-4 font-semibold text-soma-grey-50 sm:text-lg flex justify-center my-2">
        <Link
          href="/memos"
          className={`${
            currentPage === 'memos' && 'text-soma-blue-40'
          } hover:text-soma-blue-40 transition-all`}
          prefetch={false}
        >
          Memos
        </Link>
        <Link
          href="/questions"
          className={`${
            currentPage === 'questions' && 'text-soma-blue-40'
          } hover:text-soma-blue-40 transition-all`}
          prefetch={false}
        >
          Questions
        </Link>
      </div>
    </header>
  );
}
