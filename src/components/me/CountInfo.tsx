'use client'

import { useFollowContext } from "@/context/MeContextProvider"
import FollowList from "./FollowList";
import { useContext } from "react";
import { ModalContext } from "@/context/ModalProvider";
import FollowerList from "./FollowerList";

type Props= {
  userId: number;
}

export default function CountInfo({userId}:Props) {
  const { follows, followers, updateFollows, updateFollowCnt, followCnt, followerCnt, myId } = useFollowContext();
  const { open, close } = useContext(ModalContext);

  const onClickUnfollow = (userId: string) => {
    updateFollowCnt(followCnt - 1);
    updateFollows(follows.filter(follow => follow.userId.toString() != userId));
  }

  return (
    <>
      <div className='flex text-center w-full border-y'>
        <div className='w-1/3 cursor-pointer transition-all hover:bg-soma-grey-30 py-4'
          onClick={() => 
            open('팔로우 목록', close, <FollowList follows={follows} onClickUnfollow={onClickUnfollow} isMine={userId === myId}/> , 'info'
          )}
        >
          <p className='text-lg font-semibold'>
            {followCnt}
          </p>
          <p className='text-xs text-gray-400'>
            팔로우
          </p>
        </div>
        <div className='w-1/3 cursor-pointer transition-all hover:bg-soma-grey-30 py-4'
          onClick={() =>
            open("팔로워 목록", close, <FollowerList followers={followers} />, 'info')
          }
        >
          <p className='text-lg font-semibold'>
            {followerCnt}
          </p>
          <p className='text-xs text-gray-400'>
            팔로워
          </p>
        </div>
        <div className='w-1/3 py-4'>
          <p className='text-lg font-semibold'>
            9999
          </p>
          <p className='text-xs text-gray-400'>
            좋아요
          </p>
        </div>
      </div>
    </>
  )
}