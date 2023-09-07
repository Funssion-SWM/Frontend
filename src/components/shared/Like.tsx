'use-client';

import { useState } from 'react';
import { like, unlike } from '@/service/like';
import Image from 'next/image';
import fillHeart from '@/assets/icons/heart_fill.svg';
import emptyHeart from '@/assets/icons/heart_empty.svg';

type Props = {
  likes: number;
  memoId: number;
  isLike: boolean;
};

export default function Like({ likes, memoId, isLike }: Props) {
  const [currentLikeNum, setCurrentLikeNum] = useState<number>(likes);
  const [currnetIsLike, setCurrentIsLike] = useState<Boolean>(isLike);

  function handleClickLike() {
    unlike('memos', memoId);
    setCurrentLikeNum((pre) => pre - 1);
    setCurrentIsLike(false);
  }

  function handleClickUnlike() {
    like('memos', memoId);
    setCurrentLikeNum((pre) => pre + 1);
    setCurrentIsLike(true);
  }

  return (
    <>
      <button>
        {currnetIsLike ? (
          <Image
            src={fillHeart}
            alt="fill_heart"
            width={20}
            height={20}
            onClick={() => handleClickLike()}
          />
        ) : (
          <Image
            src={emptyHeart}
            alt="empty_heart"
            width={20}
            height={20}
            onClick={() => handleClickUnlike()}
          />
        )}
      </button>
      <span className="w-6 text-center text-soma-grey-49 text-sm mx-2">
        {currentLikeNum}
      </span>
    </>
  );
}
