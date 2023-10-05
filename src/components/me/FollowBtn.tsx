import { FollowListModalContext } from '@/context/FollowListModalProvider';
import { follow, unfollow } from '@/service/follow';
import { UserInfo } from '@/types';
import { useContext, useState } from 'react';

type Props = {
  isFollowed: boolean;
  userId: number;
  userInfo: UserInfo;
};

export default function FollowBtn({ isFollowed, userId, userInfo }: Props) {
  const [followed, setFollowed] = useState(isFollowed);
  const { handleClickFollow, handleClickUnfollow } = useContext(
    FollowListModalContext
  );

  const clickFollow = () => {
    follow(userId.toString()).then(() => {
      setFollowed(true);
      handleClickFollow(userInfo);
    });
  };

  const clickUnfollow = () => {
    unfollow(userId.toString()).then(() => {
      setFollowed(false);
      handleClickUnfollow(userInfo);
    });
  };

  return (
    <button
      className={`w-full rounded-3xl text-soma-blue-40 text-sm py-2 font-semibold my-5 transition-all
      ${
        followed
          ? 'bg-soma-blue-20 hover:bg-soma-blue-30'
          : 'bg-white border border-gray-200 hover:bg-gray-200 '
      }`}
      onClick={followed ? clickUnfollow : clickFollow}
    >
      {followed ? '팔로우 취소' : '팔로우'}
    </button>
  );
}
