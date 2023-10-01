'use client';

import Image from 'next/image';
import basicProfileImg from '../../assets/profile.svg';
import { UserInfo } from '@/types';
import FollowBtn from './FollowBtn';
import CountInfo from './CountInfo';
import { useEffect, useState } from 'react';

type Props = {
  userInfo: UserInfo;
  userId: number;
  followings: UserInfo[];
  followers: UserInfo[];
  isMine: boolean;
};

export default function Profile({
  userInfo,
  userId,
  followings,
  followers,
  isMine,
}: Props) {
  const [currentFollowings, setCurrentFollowings] =
    useState<UserInfo[]>(followings);
  const [currentFollowers, setCurrentFollowwers] =
    useState<UserInfo[]>(followers);

  useEffect(() => {
    console.log(userInfo);
  }, []);

  return (
    <section className="flex flex-col items-center w-full">
      <div className="text-center">
        <Image
          src={userInfo.profileImageFilePath ?? basicProfileImg}
          alt="profileImg"
          width={96}
          height={96}
          className="rounded-full w-24 h-24 object-cover"
        />
        <p className="font-bold mt-2 text-lg">{userInfo.nickname}</p>
      </div>
      <p className="p-3 rounded-md mt-1 w-full break-all text-sm overflow-y-auto text-soma-grey-60">
        {userInfo.introduce}
      </p>
      <CountInfo
        followings={currentFollowings}
        followers={currentFollowers}
        isMine={isMine}
        handleFollowing={() =>
          setCurrentFollowings(
            currentFollowings.filter((following) => following.userId !== userId)
          )
        }
      />
      {userInfo.userTags.length !== 0 && (
        <div className="flex text-sm gap-1 mt-2 self-start overflow-x-hidden w-full">
          {userInfo.userTags.map((tag, idx) => (
            <div
              className="bg-white font-semibold px-2 py-1  text-green-500 rounded-3xl"
              key={idx}
            >
              {tag}
            </div>
          ))}
        </div>
      )}
      {!isMine && (
        <FollowBtn
          isFollowed={userInfo.isFollowed}
          userId={userId}
          handleClickFollow={() =>
            setCurrentFollowwers((pre) => [...pre, userInfo])
          }
          handleClickUnfollow={() =>
            setCurrentFollowwers((pre) =>
              pre.filter((follower) => follower.userId !== userId)
            )
          }
        />
      )}
    </section>
  );
}
