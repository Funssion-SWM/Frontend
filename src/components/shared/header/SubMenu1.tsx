'use client';

import { Search } from '@/assets/svg';
import { Authority } from '@/types/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { FaMedal } from '@react-icons/all-files/fa/FaMedal';
import BlueBtn from '../btn/BlueBtn';
import { CreationModalContext } from '@/context/CreationModalProvider';
import NotificationBox from './NotificationBox';
import { Notification } from '@/types/notification';
import MoreBox from './MoreBox';

type Props = {
  authority: Authority;
  profileImageFilePath: string | undefined;
  notifications: Notification[];
};

export default function Submenu1({
  authority,
  profileImageFilePath,
  notifications,
}: Props) {
  const router = useRouter();

  const { openCreationModal } = useContext(CreationModalContext);

  return (
    <nav className="absolute flex items-center gap-2 sm:gap-3 right-1 sm:right-3">
      {authority === 'ROLE_EMPLOYER' && (
        <Link
          href="/search/user-for-job"
          className="text-sm font-semibold transition-all text-soma-blue-40 hover:text-soma-blue-50"
        >
          구직자 찾기
        </Link>
      )}
      <button onClick={() => router.push('/search/form')}>
        <Image className="cursor-pointer" src={Search} alt="search-icon" />
      </button>
      <button onClick={() => router.push('/ranking')} aria-label="ranking">
        <FaMedal className="w-5 h-5 text-soma-grey-60" />
      </button>
      <NotificationBox notifications={notifications} />
      <MoreBox
        profileImageFilePath={profileImageFilePath}
        authority={authority}
      />
      <BlueBtn
        text={'글쓰기'}
        onClick={() => {
          openCreationModal();
        }}
      />
    </nav>
  );
}
