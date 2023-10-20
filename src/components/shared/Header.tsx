'use client';

import basicProfileImg from '../../assets/profile.svg';
import Link from 'next/link';
import { checkUser, logout } from '@/service/auth';
import searchIcon from '@/assets/icons/icon_search_32.svg';
import Image from 'next/image';
import { useContext, useEffect, useRef, useState } from 'react';
import { useDetectOutsideClick } from '@/hooks/useDeleteOutsideClick';
import { useRouter } from 'next/navigation';
import BlueBtn from './btn/BlueBtn';
import { ModalContext } from '@/context/ModalProvider';
import logo from '@/assets/inforum_logo.png';
import bellIcon from '@/assets/icons/bell.svg';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { CreationModalContext } from '@/context/CreationModalProvider';
import { Notification } from '@/types/notification';
import RelativeDate from './RelativeDate';
import { checkNotifications } from '@/service/notification';

type Props = {
  isLogin: boolean;
  profileImageFilePath: string | undefined;
  notifications: Notification[];
  currentPage?: 'memos' | 'questions' | 'series';
};

export default function Header({
  isLogin,
  profileImageFilePath,
  notifications,
  currentPage,
}: Props) {
  const router = useRouter();
  const dropdownRef = useRef<HTMLElement>(null);
  const notificationRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [isNotificationActive, setIsNotificationActive] = useDetectOutsideClick(notificationRef, false);
  const [isChecked, setIsChecked] = useState<Boolean|null>(null);
  const { open } = useContext(ModalContext);
  const { openCreationModal } = useContext(CreationModalContext);
  const scrollDirection = useScrollDirection();

  const handleClick = () => {
    setIsNotificationActive(pre=>!pre);
    if (!isChecked) {
      setIsChecked(true);
      checkNotifications();
    }
  }

  return (
    <header
      className={`sticky top-0 bg-white z-10 transition-all ease-in-out duration-300 ${
        scrollDirection === 'down' && 'opacity-0 invisible'
      }`}
    >
      <div className="flex justify-center relative items-center py-4 px-1 sm:px-5 max-w-screen-xl m-auto h-[70px]">
        <Image
          src={logo}
          alt="logo"
          width={120}
          onClick={() => {
            router.push('/memos');
            router.refresh();
          }}
          className="cursor-pointer absolute left-1 sm:left-3"
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
          <Link
            href="/series"
            className={`${
              currentPage === 'series' && 'text-soma-blue-40'
            } hover:text-soma-blue-40 transition-all`}
            prefetch={false}
          >
            Series
          </Link>
        </div>
        {isLogin ? (
          <nav
            className="flex items-center gap-2 sm:gap-3 absolute right-1 sm:right-3"
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

            <nav
              className='flex items-center relative'
              ref={notificationRef}
            >

              <button onClick={handleClick} className='relative'>
                <Image
                  className='cursor-pointer'
                  src={bellIcon}
                  alt='bell_icon'
                />
                <div className={`${isChecked === null || isChecked ? 'invisible' : 'visible'} p-[5px] -top-0.5 -right-0.5 absolute bg-red-400 rounded-full`}/>
              </button>
                <ul className={`absolute top-8 max-h-[300px] overflow-y-scroll min-w-[300px] bg-white rounded-xl shadow-xl  -translate-x-1/2 ${
                  scrollDirection === 'down' && 'opacity-0 invisible'
                } ${
                  isNotificationActive ? "visible" : "hidden"
                }`}>
                  <div className='py-2 px-4 bg-gray-100 rounded-t-xl'>
                    알림
                  </div>
                  {
                    notifications?.map(notification => {
                      if (!notification.isChecked && isChecked === null) setIsChecked(false);

                      return (
                        <li key={notification.id.toString()} >
                          <div className='flex justify-between p-2 text-xs border-t border-gray-300'>
                            <span className='inline-flex items-center gap-2 cursor-pointer hover:text-soma-blue-40' onClick={() => router.push("me/"+notification.senderId)}>
                              <span className='w-7 h-7 inline-flex items-center'>
                                <Image
                                  className='cursor-pointer rounded-full inline-block'
                                  src={notification.senderImagePath ?? basicProfileImg}
                                  alt={notification.senderName}
                                  width={28}
                                  height={28}
                                />
                              </span>
                              {notification.senderName}
                            </span>

                            <span className='inline-flex items-center'>
                              <RelativeDate date={notification.created} type="YMD" />
                            </span>
                          </div>
                          <div 
                            onClick={() => notification.postTypeToShow ? 
                              router.push("/"+notification.postTypeToShow.toLocaleLowerCase()+"s/"+notification.postIdToShow) : 
                              router.push("/me/"+notification.senderId)
                            }
                            className='px-3 pb-2 text-sm flex justify-between items-center'  
                          >
                            <span className='hover:text-soma-blue-40 cursor-pointer'>
                              {notification.message}
                            </span>
                            {notification.isChecked ? <></> : <span className='bg-red-400 rounded-full inline-block w-2 h-2' />}
                          </div>
                        </li>
                    )}
                    )
                  }
                </ul>

            </nav>

            <nav
              className='flex items-center'
              ref={dropdownRef}
            >
              <button onClick={() => setIsActive((pre) => !pre)}>
                <Image
                  src={profileImageFilePath ?? basicProfileImg}
                  alt="profileImg"
                  width={32}
                  height={32}
                  className="rounded-full w-8 h-8 object-cover"
                />
              </button>

              <div
                className={`absolute top-9 right-[36px] sm:top-10 sm:right-[44px] bg-white flex flex-col gap-1 rounded-lg shadow-inner z-10${
                  scrollDirection === 'down' && 'opacity-0 invisible'
                } ${
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
              </div>
            </nav>
            <BlueBtn
              text={'만들기'}
              onClick={() => {
                openCreationModal();
                setIsActive(false);
              }}
            />
          </nav>
        ) : (
          <nav className="flex items-center gap-3 absolute right-1 sm:right-3">
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
        <Link
          href="/series"
          className={`${
            currentPage === 'series' && 'text-soma-blue-40'
          } hover:text-soma-blue-40 transition-all`}
          prefetch={false}
        >
          Series
        </Link>
      </div>
    </header>
  );
}
