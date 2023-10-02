import { follow, unfollow } from '@/service/follow';
import { useState } from 'react';

type Props = {
  isFollowed: boolean;
  userId: number;
  handleClickFollow: () => void;
  handleClickUnfollow: () => void;
};

export default function FollowBtn({
  isFollowed,
  userId,
  handleClickFollow,
  handleClickUnfollow,
}: Props) {
  const [followed, setFollowed] = useState(isFollowed);

  const clickFollow = () => {
    follow(userId.toString()).then(() => {
      setFollowed(true);
      handleClickFollow();
    });
  };

  const clickUnfollow = () => {
    unfollow(userId.toString()).then(() => {
      setFollowed(false);
      handleClickUnfollow();
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