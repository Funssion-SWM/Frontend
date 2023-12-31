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
import { FaRankingStar } from 'react-icons/fa6';
import '@/styles/headerScrollbar.css';
import { MAIN_PATH } from '@/utils/const';
import { Authority } from '@/types';

type Props = {
  isLogin: boolean;
  profileImageFilePath: string | undefined;
  notifications: Notification[];
  currentPage?: 'memos' | 'questions' | 'series';
  authority: Authority;
};

export default function Header({
  isLogin,
  profileImageFilePath,
  notifications,
  currentPage,
  authority,
}: Props) {
  const router = useRouter();
  const dropdownRef = useRef<HTMLElement>(null);
  const notificationRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [isNotificationActive, setIsNotificationActive] = useDetectOutsideClick(
    notificationRef,
    false
  );
  const [isChecked, setIsChecked] = useState<Boolean | null>(null);
  const { open } = useContext(ModalContext);
  const { openCreationModal } = useContext(CreationModalContext);
  const scrollDirection = useScrollDirection();

  const handleClick = () => {
    setIsNotificationActive((pre) => !pre);
    if (!isChecked) {
      setIsChecked(true);
      checkNotifications();
    }
  };

  return (
    <header
      className={`sticky top-0 bg-white z-10 transition-all ease-in-out duration-300 ${
        scrollDirection === 'down' && 'opacity-0 invisible'
      }`}
    >
      <div className="flex justify-center relative items-center py-4 px-1 sm:px-5 max-w-screen-xl m-auto h-[70px]">
        <button
          onClick={() => {
            router.push(MAIN_PATH);
            router.refresh();
          }}
          className="absolute cursor-pointer left-1"
        >
          <Image
            src={logo}
            alt="logo"
            className="sm:left-3 w-[90px] sm:w-[120px]"
          />
        </button>

        <div className="hidden gap-4 font-semibold sm:flex text-soma-grey-50 sm:text-lg">
          <Link
            href="/series"
            className={`${
              currentPage === 'series' && 'text-soma-blue-40'
            } hover:text-soma-blue-40 transition-all`}
            prefetch={false}
          >
            Series
          </Link>
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
          <nav className="absolute flex items-center gap-2 sm:gap-3 right-1 sm:right-3">
            {authority === 'ROLE_EMPLOYER' && (
              <Link
                href="/search/user-for-job"
                className="text-sm font-semibold transition-all text-soma-blue-40 hover:text-soma-blue-50"
              >
                구직자 찾기
              </Link>
            )}
            {/* <div className="relative">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfnkPn7J4uwSP-g3nclOVsx1m4ePUbf_GEpYG1Cpsh2aWgtMQ/viewform?usp=sf_link"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold transition text-soma-grey-50 hover:text-soma-blue-40"
              >
                이벤트
              </a>
              <div className="absolute w-20 text-xs font-semibold duration-1000 ease-in-out -top-4 -left-5 text-soma-grey-60 animate-bounce">
                <span className="text-green-400">N pay</span> 3000원
              </div>
            </div> */}

            <button onClick={() => router.push('/search/form')}>
              <Image
                className="cursor-pointer"
                src={searchIcon}
                alt="search_icon"
              />
            </button>

            <button
              onClick={() => router.push('/ranking')}
              aria-label="ranking"
            >
              <FaRankingStar className="w-5 h-5 text-soma-grey-60" />
            </button>

            <nav className="relative flex items-center" ref={notificationRef}>
              <button onClick={handleClick} className="relative">
                <Image
                  className="cursor-pointer"
                  src={bellIcon}
                  alt="bell_icon"
                />
                <div
                  className={`${
                    isChecked === null || isChecked ? 'invisible' : 'visible'
                  } p-[5px] -top-0.5 -right-0.5 absolute bg-red-400 rounded-full`}
                />
              </button>
              <ul
                className={`absolute top-8 max-h-[300px] overflow-auto scroll-p-0 min-w-[300px] bg-white rounded-xl shadow-xl -translate-x-1/2 scroll-remove ${
                  scrollDirection === 'down' && 'opacity-0 invisible'
                } ${isNotificationActive ? 'visible' : 'hidden'}`}
              >
                <div className="px-4 py-2 bg-gray-100 rounded-t-xl">알림</div>
                {notifications?.map((notification) => {
                  if (!notification.isChecked && isChecked === null)
                    setIsChecked(false);

                  return (
                    <li key={notification.id.toString()}>
                      <div className="flex justify-between px-2 py-1 text-xs border-t border-gray-300">
                        <button
                          className="inline-flex items-center gap-2 cursor-pointer hover:text-soma-blue-40"
                          onClick={() =>
                            router.push('me/' + notification.senderId)
                          }
                        >
                          <span className="inline-flex items-center">
                            <Image
                              className="inline-block object-cover rounded-full cursor-pointer w-7 h-7"
                              src={
                                notification.senderImagePath ?? basicProfileImg
                              }
                              alt={notification.senderName}
                              width={28}
                              height={28}
                            />
                          </span>
                          {notification.senderName}
                        </button>

                        <span className="inline-flex items-center">
                          <RelativeDate
                            date={notification.created}
                            type="YMD"
                          />
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          switch (notification.notificationType) {
                            case 'NEW_INTERVIEW':
                              checkUser().then((data) => {
                                router.push(
                                  `/mini-interview?employerId=${notification.senderId}&employeeId=${data.id}`
                                );
                              });
                              break;
                            case 'NEW_FOLLOWER':
                            case 'NEW_EMPLOYER':
                              router.push('/me/' + notification.senderId);
                              break;
                            case 'NEW_INTERVIEW_COMPLETE':
                              router.push(
                                `/me/employer/id?intervieweeId=${notification.senderId}`
                              );
                              break;
                            default:
                              router.push(
                                '/' +
                                  notification.postTypeToShow.toLocaleLowerCase() +
                                  's/' +
                                  notification.postIdToShow
                              );
                          }
                        }}
                        className="flex items-center justify-between px-3 pb-2 text-sm"
                      >
                        <span className="cursor-pointer hover:text-soma-blue-40">
                          {notification.message}
                        </span>
                        {notification.isChecked ? (
                          <></>
                        ) : (
                          <span className="inline-block w-2 h-2 bg-red-400 rounded-full" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <nav className="flex items-center" ref={dropdownRef}>
              <button onClick={() => setIsActive((pre) => !pre)}>
                <Image
                  src={profileImageFilePath ?? basicProfileImg}
                  alt="profileImg"
                  width={32}
                  height={32}
                  className="object-cover w-8 h-8 rounded-full"
                />
              </button>

              <div
                className={`absolute top-9 right-[36px] sm:top-10 sm:right-[44px] bg-white flex flex-col gap-1 rounded-lg shadow-inner z-10${
                  scrollDirection === 'down' && 'opacity-0 invisible'
                } ${isActive ? 'visible' : 'invisible'}`}
              >
                {authority === 'ROLE_EMPLOYER' && (
                  <button
                    className="p-2 px-3 tracking-wider rounded-t-lg hover:bg-gray-200"
                    onClick={() => {
                      checkUser().then((data) => {
                        router.push(`/me/employer/${data.id}`);
                        router.refresh();
                      });
                      setIsActive(false);
                    }}
                  >
                    채용자 페이지
                  </button>
                )}
                <button
                  className="p-2 px-3 tracking-wider rounded-t-lg hover:bg-gray-200"
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
                  className="p-2 px-3 tracking-wider hover:bg-gray-200"
                  onClick={() => {
                    checkUser().then((data) =>
                      router.push(`/drafts/${data.id}`)
                    );
                    setIsActive(false);
                  }}
                >
                  임시글
                </button>
                <button
                  className="p-2 px-3 tracking-wider rounded-b-lg hover:bg-gray-200"
                  onClick={() => {
                    setIsActive(false);
                    open('로그아웃 하시겠습니까?', () => {
                      logout().then(() => {
                        router.push(MAIN_PATH);
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
              text={'글쓰기'}
              onClick={() => {
                openCreationModal();
                setIsActive(false);
              }}
            />
          </nav>
        ) : (
          <nav className="absolute flex items-center gap-3 right-1 sm:right-3">
            {/* <div className="relative">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfnkPn7J4uwSP-g3nclOVsx1m4ePUbf_GEpYG1Cpsh2aWgtMQ/viewform?usp=sf_link"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold transition text-soma-grey-50 hover:text-soma-blue-40"
              >
                이벤트
              </a>
              <div className="absolute w-20 text-xs font-semibold duration-1000 ease-in-out -top-4 -left-5 text-soma-grey-60 animate-bounce">
                <span className="text-green-400">N pay</span> 3000원
              </div>
            </div> */}
            <Link
              href="/guide"
              className={`font-semibold text-soma-grey-50 hover:text-soma-blue-40 transition-all text-sm`}
              prefetch={false}
            >
              에디터 체험
            </Link>
            <button onClick={() => router.push('/search/form')}>
              <Image
                className="cursor-pointer"
                src={searchIcon}
                alt="search_icon"
              />
            </button>
            <button
              onClick={() => router.push('/ranking')}
              aria-label="ranking"
            >
              <FaRankingStar className="w-5 h-5 text-soma-grey-60" />
            </button>
            <Link href="/login">
              <BlueBtn text="로그인" onClick={() => {}} />
            </Link>
          </nav>
        )}
      </div>
      <div className="flex justify-center gap-4 my-2 font-semibold sm:hidden text-soma-grey-50 sm:text-lg">
        <Link
          href="/series"
          className={`${
            currentPage === 'series' && 'text-soma-blue-40'
          } hover:text-soma-blue-40 transition-all`}
          prefetch={false}
        >
          Series
        </Link>
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
