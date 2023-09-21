'use-client';

import { useState } from 'react';
import { like, unlike } from '@/service/like';
import Image from 'next/image';
import fillHeart from '@/assets/icons/heart_fill.svg';
import emptyHeart from '@/assets/icons/heart_empty.svg';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

type Props = {
  likes: number;
  memoId: number;
  isLike: boolean;
};

export default function Like({ likes, memoId, isLike }: Props) {
  const [currentLikeNum, setCurrentLikeNum] = useState<number>(likes);
  const [currnetIsLike, setCurrentIsLike] = useState<Boolean>(isLike);
  const router = useRouter();

  function handleClickLike() {
    unlike('memos', memoId)
      .then(() => {
        setCurrentLikeNum((pre) => pre - 1);
        setCurrentIsLike(false);
      })
      .catch((err) => {
        toast(`${err}`, {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'error',
        });
        router.push('/login');
      });
  }

  function handleClickUnlike() {
    like('memos', memoId)
      .then(() => {
        setCurrentLikeNum((pre) => pre + 1);
        setCurrentIsLike(true);
      })
      .catch((err) => {
        toast(`${err}`, {
          hideProgressBar: true,
          autoClose: 2000,
          type: 'error',
        });
        router.push('/login');
      });
  }

  return (
    <>
      {currnetIsLike ? (
        <button>
          <Image
            src={fillHeart}
            alt="fill_heart"
            width={20}
            height={20}
            onClick={() => handleClickLike()}
          />
        </button>
      ) : (
        <button>
          <Image
            src={emptyHeart}
            alt="empty_heart"
            width={20}
            height={20}
            onClick={() => handleClickUnlike()}
          />
        </button>
      )}
      <span className="w-6 text-center text-soma-grey-49 text-sm mx-2">
        {currentLikeNum}
      </span>
    </>
  );
}
