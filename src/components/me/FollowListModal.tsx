'use client';

import { useContext } from 'react';
import CloseIcon from '../search/CloseIcon';
import { FollowListModalContext } from '@/context/FollowListModalProvider';
import Link from 'next/link';
import Image from 'next/image';
import WhiteBtn from '../shared/btn/WhiteBtn';
import { unfollow } from '@/service/follow';
import { DefaultProfile } from '@/assets/svg';

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
      <div className="fixed top-0 z-10">
        <Overay onClick={() => close()} />
        <div
          className="fixed flex flex-col shadow-lg items-center bg-white rounded-2xl p-5 sm:p-8 
      top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-2 w-[300px] h-[300px]"
        >
          <p className="mb-2 font-medium sm:text-lg">
            {type === 'following' ? '팔로잉 목록' : '팔로워 목록'}
          </p>
          {(type === 'following' ? currentFollowings : currentFollowers)
            .length === 0 ? (
            <div className="m-auto text-soma-grey-50">
              해당 데이터가 없습니다...
            </div>
          ) : (
            <ul className="flex flex-col w-full gap-2 overflow-y-auto">
              {(type === 'following'
                ? currentFollowings
                : currentFollowers
              ).map((item) => (
                <li
                  key={item.userId}
                  id={item.userId.toString()}
                  className="flex items-center w-full"
                >
                  <Link
                    onClick={() => close()}
                    href={`/me/${item.userId}`}
                    prefetch={false}
                    className="flex transition-all grow hover:bg-soma-grey-25 rounded-3xl"
                  >
                    <Image
                      src={item.profileImageFilePath ?? DefaultProfile}
                      alt="profileImg"
                      width={40}
                      height={40}
                      className="object-cover w-10 h-10 rounded-full"
                    />
                    <h4 className="self-center ml-4 font-medium text-soma-grey-60 grow">
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
                      extraStyle={`ml-auto i`}
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
