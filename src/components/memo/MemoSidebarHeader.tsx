import Image from 'next/image';
import Link from 'next/link';
import WhiteBtn from '../shared/btn/WhiteBtn';
import BarBtn from '../shared/btn/BarBtn';
import { useState } from 'react';
import { follow, unfollow } from '@/service/follow';
import { notifyToast } from '@/utils/notify';
import { useRouter } from 'next/navigation';
import { Rank } from '@/types/rank';
import { getImageSrcFromRank } from '@/utils/rank';
import { DefaultProfile } from '@/assets/svg';

type Props = {
  authorId: number;
  authorName: string;
  authorProfileImagePath: string;
  currentCategory: 'comment' | 'question' | 'recommendation';
  onCategoryBtnClick: (
    category: 'comment' | 'question' | 'recommendation'
  ) => void;
  isFollowed: boolean;
  isMyMemo: boolean;
  isLogin: boolean;
  authorFollowingNum: number;
  authorFollowerNum: number;
  authorRank: Rank;
};

export default function MemoSidebarHeader({
  authorId,
  authorName,
  authorProfileImagePath,
  currentCategory,
  onCategoryBtnClick,
  isFollowed,
  isMyMemo,
  isLogin,
  authorFollowingNum,
  authorFollowerNum,
  authorRank,
}: Props) {
  const [isCurrentFollowed, setIsCurrentFollowed] = useState(isFollowed);
  const [currentFollowerNum, setCurrentFollowerNum] =
    useState(authorFollowerNum);
  const router = useRouter();

  return (
    <div className="sticky top-0 p-3 pb-0 bg-white rounded-t-2xl ">
      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm">
          <div className="relative">
            <Link href={`/me/${authorId}`} prefetch={false}>
              <Image
                src={authorProfileImagePath ?? DefaultProfile}
                alt="profileImg"
                width={36}
                height={36}
                className="object-cover border-2 rounded-full w-9 h-9 border-soma-grey-30"
              />
            </Link>
            <Image
              src={getImageSrcFromRank(authorRank)}
              alt="rank"
              width={30}
              height={30}
              className="absolute top-0 -translate-x-1/2 -translate-y-1/2"
            />
          </div>
          <div className="ml-3">
            <div className="font-semibold text-soma-grey-60">{authorName}</div>
            <div className="flex gap-1 text-xs text-soma-grey-49">
              <div>팔로워 {currentFollowerNum}</div>
              <div>팔로잉 {authorFollowingNum}</div>
            </div>
          </div>
        </div>
        {isLogin &&
          !isMyMemo &&
          (isCurrentFollowed ? (
            <WhiteBtn
              text="팔로우 취소"
              onClick={() => {
                unfollow(authorId.toString()).then((res) => {
                  if (res?.code) {
                    if (res.code === 401) router.push('/login');
                    notifyToast(res.message, 'error');
                    return;
                  }
                  setCurrentFollowerNum(currentFollowerNum - 1);
                  setIsCurrentFollowed(false);
                });
              }}
            />
          ) : (
            <WhiteBtn
              text="팔로우"
              onClick={() => {
                follow(authorId.toString()).then((res) => {
                  if (res?.code) {
                    if (res.code === 401) router.push('/login');
                    notifyToast(res.message, 'error');
                    return;
                  }
                  setCurrentFollowerNum(currentFollowerNum + 1);
                  setIsCurrentFollowed(true);
                });
              }}
            />
          ))}
      </div>
      <div className="flex gap-1 mt-3 mb-1">
        <BarBtn
          text="댓글"
          onClick={() => onCategoryBtnClick('comment')}
          isSelected={currentCategory === 'comment'}
        />
        <BarBtn
          text="Q&A"
          onClick={() => onCategoryBtnClick('question')}
          isSelected={currentCategory === 'question'}
        />
        <BarBtn
          text="추천"
          onClick={() => onCategoryBtnClick('recommendation')}
          isSelected={currentCategory === 'recommendation'}
        />
      </div>
    </div>
  );
}
