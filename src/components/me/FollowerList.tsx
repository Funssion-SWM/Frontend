import Link from 'next/link';
import Image from 'next/image';
import basicProfileImg from '@/assets/profile.svg';
import { UserInfo } from '@/types';
import { useContext } from 'react';
import { ModalContext } from '@/context/ModalProvider';

type Props = {
  followers: UserInfo[];
};

export default function FollowerList({ followers }: Props) {
  const { close } = useContext(ModalContext);

  return (
    <ul>
      {followers.map((followerUserInfo) => (
        <li
          key={followerUserInfo.userId}
          id={followerUserInfo.userId.toString()}
        >
          <div className="w-[300px] flex my-2">
            <Link
              onClick={() => close()}
              href={`/me/${followerUserInfo.userId}`}
              className="flex w-full transition-all hover:bg-soma-grey-25 rounded-3xl"
            >
              <Image
                src={followerUserInfo.profileImageFilePath ?? basicProfileImg}
                alt="profileImg"
                width={40}
                height={40}
                className="rounded-full w-10 h-10 object-cover"
              />
              <h4 className="text-soma-grey-60 self-center font-medium ml-4">
                {followerUserInfo.nickname}
              </h4>
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
