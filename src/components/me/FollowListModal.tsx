'use client';

import { useContext } from 'react';
import CloseIcon from '../search/CloseIcon';
import { FollowListModalContext } from '@/context/FollowListModalProvider';
import Link from 'next/link';
import Image from 'next/image';
import WhiteBtn from '../shared/btn/WhiteBtn';
import basicProfileImg from '@/assets/profile.svg';
import { unfollow } from '@/service/follow';
import { useRouter } from 'next/navigation';

export default function FollowListModal() {
  const { isOpen, close, type, listData, onCancel, isMine } = useContext(
    FollowListModalContext
  );

  return (
    isOpen && (
      <div className="absolute top-0">
        <Overay onClick={() => close()} />
        <div
          className="fixed flex flex-col shadow-lg items-center bg-white rounded-2xl p-5 sm:p-10 
      top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-2 "
        >
          <p className="sm:text-lg">
            {type === 'following' ? '팔로잉 목록' : '팔로워 목록'}
          </p>
          <ul>
            {listData.map((item) => (
              <li key={item.userId} id={item.userId.toString()}>
                <div className="flex my-2">
                  <Link
                    onClick={() => close()}
                    href={`/me/${item.userId}`}
                    className="flex w-[300px] transition-all hover:bg-soma-grey-25 rounded-3xl"
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
                          onCancel();
                          // onClickUnfollow(item.userId.toString());
                          let element = document.getElementById(
                            item.userId.toString()
                          );
                          if (element) element.hidden = true;
                        });
                      }}
                      extraStyle={`ml-auto`}
                    />
                  )}
                </div>
              </li>
            ))}
          </ul>
          <CloseIcon
            size={24}
            onClick={() => close()}
            extraClass={`absolute top-5 right-5`}
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
