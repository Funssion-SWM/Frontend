import Image from 'next/image';
import Link from 'next/link';
import WhiteBtn from '../shared/btn/WhiteBtn';
import basicProfileImg from '@/assets/profile.svg';
import BarBtn from '../shared/btn/BarBtn';
import { useState } from 'react';
import { follow, unfollow } from '@/service/follow';
import { notifyToast } from '@/service/notify';
import { useRouter } from 'next/navigation';
import { Rank } from '@/types/rank';
import { getImageSrcFromRank } from '@/service/rank';

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
    <div className="bg-white rounded-t-2xl sticky top-0 p-3 pb-0 ">
      <div className="flex justify-between items-center">
        <div className="flex items-center text-sm">
          <div className="relative">
            <Link href={`/me/${authorId}`} prefetch={false}>
              <Image
                src={authorProfileImagePath ?? basicProfileImg}
                alt="profileImg"
                width={35}
                height={35}
                className="w-9 h-9 rounded-full border-2 border-soma-grey-30"
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
            <div className="text-soma-grey-60 font-semibold">{authorName}</div>
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
        {/* <BarBtn
          text="추천"
          onClick={() => {
            alert('지원 예정입니다! 개발자들이 열심히 개발하고 있어요 :)');
          }}
          isSelected={currentCategory === 'recommendation'}
        /> */}
      </div>
    </div>
  );
}
