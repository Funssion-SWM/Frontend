import Link from 'next/link';
import Image from 'next/image';
import basicProfileImg from '@/assets/profile.svg';
import { UserInfo } from '@/types';
import WhiteBtn from '../shared/btn/WhiteBtn';
import { useContext } from 'react';
import { ModalContext } from '@/context/ModalProvider';
import { unfollow } from '@/service/follow';

type Props = {
  follows: UserInfo[];
  onClickUnfollow: (userId: string) => void;
  isMine: boolean;
};

export default function FollowList({
  follows,
  onClickUnfollow,
  isMine,
}: Props) {
  const { close } = useContext(ModalContext);

  return (
    <ul>
      {follows.map((followUserInfo) => (
        <li key={followUserInfo.userId} id={followUserInfo.userId.toString()}>
          <div className="flex my-2">
            <Link
              onClick={() => close()}
              href={`/me/${followUserInfo.userId}`}
              className="flex w-[300px] transition-all hover:bg-soma-grey-25 rounded-3xl"
            >
              <Image
                src={followUserInfo.profileImageFilePath ?? basicProfileImg}
                alt="profileImg"
                width={40}
                height={40}
                className="rounded-full w-10 h-10 object-cover"
              />
              <h4 className="text-soma-grey-60 self-center font-medium ml-4">
                {followUserInfo.nickname}
              </h4>
            </Link>
            <WhiteBtn
              text="취소"
              onClick={() => {
                unfollow(followUserInfo.userId.toString()).then(() => {
                  onClickUnfollow(followUserInfo.userId.toString());
                  let element = document.getElementById(
                    followUserInfo.userId.toString()
                  );
                  if (element) element.hidden = true;
                });
              }}
              extraStyle={`ml-auto ${isMine ? 'visible' : 'hidden'}`}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
