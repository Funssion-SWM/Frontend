import { useContext } from 'react';
import { FollowListModalContext } from '@/context/FollowListModalProvider';
import { UserInfo } from '@/types';

type Props = {
  followings: UserInfo[];
  followers: UserInfo[];
  isMine: boolean;
  handleFollowing: () => void;
};

export default function CountInfo({
  followings,
  followers,
  isMine,
  handleFollowing,
}: Props) {
  const { open } = useContext(FollowListModalContext);

  return (
    <>
      <div className="flex text-center w-full border-y">
        <div
          className="w-1/3 cursor-pointer transition-all hover:bg-soma-grey-30 py-4"
          onClick={() => open('following', followings, handleFollowing, isMine)}
        >
          <p className="text-lg font-semibold">{followings.length}</p>
          <p className="text-xs text-gray-400">팔로잉</p>
        </div>
        <div
          className="w-1/3 cursor-pointer transition-all hover:bg-soma-grey-30 py-4"
          onClick={() => open('follower', followers, () => {}, isMine)}
        >
          <p className="text-lg font-semibold">{followers.length}</p>
          <p className="text-xs text-gray-400">팔로워</p>
        </div>
        <div className="w-1/3 py-4">
          <p className="text-lg font-semibold">9999</p>
          <p className="text-xs text-gray-400">좋아요</p>
        </div>
      </div>
    </>
  );
}
