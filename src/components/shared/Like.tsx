'use-client';

import { useEffect, useState } from 'react';
import { getIsLiked, like, unlike } from '@/service/like';
import Image from 'next/image';
import fillHeart from '../../assets/icons/heart_fill.svg';
import emptyHeart from '../../assets/icons/heart_empty.svg';

type Props = {
  likes: number;
  memoId: number;
  uid: number | null;
};

export default function Like({ likes, memoId, uid }: Props) {
  const [likeNums, setLikeNums] = useState<number>(likes);
  const [isLike, setIsLike] = useState<Boolean | null>(null);

  async function first() {
    await getIsLiked('memos', memoId).then((data) => {
      setIsLike(data.isLike);
      setLikeNums(data.likes);
    });
  }

  useEffect(() => {
    first();
  }, []);

  function handleClickUnlike() {
    if (uid == -1) return;

    setLikeNums((pre) => pre + 1);
    setIsLike((pre) => !pre);
    like('memos', memoId);
  }

  function handleClickLike() {
    if (uid == -1) return;

    setLikeNums((pre) => pre - 1);
    setIsLike((pre) => !pre);

    unlike('memos', memoId);
  }

  return (
    <>
      <button>
        {isLike === true && (
          <Image
            src={fillHeart}
            alt="fill_heart"
            width={20}
            height={20}
            onClick={() => handleClickLike()}
          />
        )}
        {isLike === false && (
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
        {likeNums}
      </span>
    </>
  );
}
