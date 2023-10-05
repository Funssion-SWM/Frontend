'use client';

import { useContext } from 'react';
import CloseIcon from '../search/CloseIcon';
import { FollowListModalContext } from '@/context/FollowListModalProvider';
import Link from 'next/link';
import Image from 'next/image';
import WhiteBtn from '../shared/btn/WhiteBtn';
import basicProfileImg from '@/assets/profile.svg';
import { unfollow } from '@/service/follow';

type Props = {
  isMine: boolean;
};

export default function FollowListModal({ isMine }: Props) {
  const {
    isOpen,
    close,
    type,
    currentFollowings,
    currentFollowers,
    handleCancelFollowing,
  } = useContext(FollowListModalContext);

  return (
    isOpen && (
      <div className="absolute top-0 z-10">
        <Overay onClick={() => close()} />
        <div
          className="fixed flex flex-col shadow-lg items-center bg-white rounded-2xl p-5 sm:p-8 
      top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-2 w-[300px] h-[300px]"
        >
          <p className="sm:text-lg font-medium mb-2">
            {type === 'following' ? '팔로잉 목록' : '팔로워 목록'}
          </p>
          {(type === 'following' ? currentFollowings : currentFollowers)
            .length === 0 ? (
            <div className="m-auto text-soma-grey-50">
              해당 데이터가 없습니다...
            </div>
          ) : (
            <ul className="flex flex-col overflow-y-auto w-full gap-2">
              {(type === 'following'
                ? currentFollowings
                : currentFollowers
              ).map((item) => (
                <li
                  key={item.userId}
                  id={item.userId.toString()}
                  className="flex w-full  items-center"
                >
                  <Link
                    onClick={() => close()}
                    href={`/me/${item.userId}`}
                    className="flex transition-all hover:bg-soma-grey-25 rounded-3xl"
                  >
                    <Image
                      src={item.profileImageFilePath ?? basicProfileImg}
                      alt="profileImg"
                      width={40}
                      height={40}
                      className="rounded-full w-10 h-10 object-cover"
                    />
                    <h4 className="text-soma-grey-60 self-center font-medium ml-4">
                      {item.nickname}
                    </h4>
                  </Link>
                  {type === 'following' && isMine && (
                    <WhiteBtn
                      text="취소"
                      onClick={() => {
                        unfollow(item.userId.toString()).then(() => {
                          handleCancelFollowing(item.userId);
                        });
                      }}
                      extraStyle={`ml-auto`}
                    />
                  )}
                </li>
              ))}
            </ul>
          )}
          <CloseIcon
            size={24}
            onClick={() => close()}
            extraClass={`absolute top-3 right-3`}
          />
        </div>
      </div>
    )
  );
}

function Overay({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="w-screen h-screen bg-white opacity-50"
      onClick={onClick}
    ></div>
  );
}
