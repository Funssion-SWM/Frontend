'use-client';

import { useState } from 'react';
import { like, likeComment, unlike, unlikeComment } from '@/service/like';
import Image from 'next/image';
import fillHeart from '@/assets/icons/heart_fill.svg';
import emptyHeart from '@/assets/icons/heart_empty.svg';
import { useRouter } from 'next/navigation';
import { notifyToast } from '@/service/notification';
import { azertMono } from '@/styles/fonts';

type Props = {
  likeNum: number;
  postId: number;
  isLike: boolean;
  postType: 'memo' | 'question' | 'comment' | 'recomment' | 'series';
  iconSize: number;
};
export default function LikeBox({
  likeNum,
  postId,
  isLike,
  postType,
  iconSize,
}: Props) {
  const [currentLikeNum, setCurrentLikeNum] = useState<number>(likeNum);
  const [currentIsLike, setCurrentIsLike] = useState<Boolean>(isLike);
  const router = useRouter();

  function handleClickLike() {
    let fn;
    switch (postType) {
      case 'memo':
        fn = unlike('memos', postId);
        break;
      case 'comment':
        fn = unlikeComment(postId, false);
        break;
      case 'recomment':
        fn = unlikeComment(postId, true);
        break;
      case 'question':
        fn = unlike('questions', postId);
        break;
      case 'series':
        fn = unlike('series', postId);
      default:
        throw new Error('해당하는 unlike item type이 없음');
    }
    fn?.then((res) => {
      if (res?.code) {
        if (res.code === 401) router.push('/login');
        notifyToast(res.message, 'error');
        return;
      }
      setCurrentLikeNum(isLike ? likeNum - 1 : likeNum);
      setCurrentIsLike(false);
    });
  }

  function handleClickUnlike() {
    let fn;
    switch (postType) {
      case 'memo':
        fn = like('memos', postId);
        break;
      case 'comment':
        fn = likeComment(postId, false);
        break;
      case 'recomment':
        fn = likeComment(postId, true);
        break;
      case 'question':
        fn = like('questions', postId);
        break;
      case 'series':
        fn = like('series', postId);
      default:
        throw new Error('해당하는 like item type이 없음');
    }
    fn?.then((res) => {
      if (res?.code) {
        if (res.code === 401) router.push('/login');
        notifyToast(res.message, 'error');
        return;
      }
      setCurrentLikeNum(isLike ? likeNum : likeNum + 1);
      setCurrentIsLike(true);
    });
  }

  return (
    <div className="flex items-center">
      {currentIsLike ? (
        <button onClick={handleClickLike}>
          <Image
            src={fillHeart}
            alt="fill_heart"
            width={iconSize}
            height={iconSize}
          />
        </button>
      ) : (
        <button onClick={handleClickUnlike}>
          <Image
            src={emptyHeart}
            alt="empty_heart"
            width={iconSize}
            height={iconSize}
          />
        </button>
      )}
      <span
        className={`text-sm ml-1 text-soma-grey-49 ${azertMono.className} `}
      >
        {currentLikeNum}
      </span>
    </div>
  );
}
