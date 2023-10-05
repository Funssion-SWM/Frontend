import { useContext } from 'react';
import { FollowListModalContext } from '@/context/FollowListModalProvider';

type Props = {
  isMine: boolean;
};

export default function CountInfo({ isMine }: Props) {
  const { open, currentFollowings, currentFollowers } = useContext(
    FollowListModalContext
  );

  return (
    <div className="flex text-center w-full border-y">
      <div
        className="w-1/3 cursor-pointer transition-all hover:bg-soma-grey-30 py-4"
        onClick={() => open('following')}
      >
        <p className="text-lg font-semibold">{currentFollowings.length}</p>
        <p className="text-xs text-gray-400">팔로잉</p>
      </div>
      <div
        className="w-1/3 cursor-pointer transition-all hover:bg-soma-grey-30 py-4"
        onClick={() => open('follower')}
      >
        <p className="text-lg font-semibold">{currentFollowers.length}</p>
        <p className="text-xs text-gray-400">팔로워</p>
      </div>
      <div className="w-1/3 py-4">
        <p className="text-lg font-semibold">9999</p>
        <p className="text-xs text-gray-400">좋아요</p>
      </div>
    </div>
  );
}
