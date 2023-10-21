import { FollowListModalContext } from '@/context/FollowListModalProvider';
import { follow, unfollow } from '@/service/follow';
import { notifyToast } from '@/service/notify';
import { UserInfo } from '@/types';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';

type Props = {
  isFollowed: boolean;
  userId: number;
  myUserInfo: UserInfo;
};

export default function FollowBtn({ isFollowed, userId, myUserInfo }: Props) {
  const [followed, setFollowed] = useState(isFollowed);
  const { handleClickFollow, handleClickUnfollow } = useContext(
    FollowListModalContext
  );
  const router = useRouter();

  const clickFollow = () => {
    follow(userId.toString()).then((res) => {
      if (res?.code) {
        if (res.code === 401) router.push('/login');
        notifyToast(res.message, 'error');
        return;
      }
      setFollowed(true);
      handleClickFollow(myUserInfo);
    });
  };

  const clickUnfollow = () => {
    unfollow(userId.toString()).then((res) => {
      if (res?.code) {
        if (res.code === 401) router.push('/login');
        notifyToast(res.message, 'error');
        return;
      }
      setFollowed(false);
      handleClickUnfollow(myUserInfo);
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
