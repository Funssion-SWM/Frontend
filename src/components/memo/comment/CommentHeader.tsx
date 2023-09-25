import Image from 'next/image';
import basicProfileImg from '@/assets/profile.svg';
import Link from 'next/link';
import fillHeart from '@/assets/icons/heart_fill.svg';
import emptyHeart from '@/assets/icons/heart_empty.svg';
import { useState } from 'react';
import { likeComment, unlikeComment } from '@/service/like';
import { useRouter } from 'next/navigation';
import { notifyToast } from '@/service/notification';

type Props = {
  commentId: number;
  authorId: number;
  authorImagePath: string;
  authorName: string;
  createdDate: string;
  isLike: boolean;
  likeNum: number;
  isRecomment: boolean;
};

export default function CommentHeader({
  commentId,
  authorId,
  authorImagePath,
  authorName,
  createdDate,
  isLike,
  likeNum,
  isRecomment,
}: Props) {
  const [currentLikeNum, setCurrentLikeNum] = useState(likeNum);
  const [currentIsLike, setCurrentIsLike] = useState(isLike);
  const router = useRouter();

  const handleClickLike = () => {
    unlikeComment(commentId, isRecomment)
      .then(() => {
        setCurrentLikeNum((pre) => pre - 1);
        setCurrentIsLike(false);
      })
      .catch((err) => {
        notifyToast(`${err}`, 'error');
        router.push('/login');
      });
  };

  const handleClickUnlike = () => {
    likeComment(commentId, isRecomment)
      .then(() => {
        setCurrentLikeNum((pre) => pre + 1);
        setCurrentIsLike(true);
      })
      .catch((err) => {
        notifyToast(`${err}`, 'error');
        router.push('/login');
      });
  };

  return (
    <div className={`flex justify-between ${!isRecomment && 'px-3'}`}>
      <div className="flex items-center ">
        <Link href={`/me/${authorId}`}>
          <Image
            src={authorImagePath ?? basicProfileImg}
            alt="profileImg"
            width={28}
            height={28}
            className="rounded-full w-7 h-7 object-cover "
          />
        </Link>
        <div className="ml-2 text-xs">
          <div className="text-soma-grey-60">{authorName}</div>
          <p className="text-xs text-soma-grey-49">{createdDate}</p>
        </div>
      </div>
      <div className="flex items-center">
        {currentIsLike ? (
          <button onClick={handleClickLike}>
            <Image src={fillHeart} alt="fill_heart" width={15} height={15} />
          </button>
        ) : (
          <button onClick={handleClickUnlike}>
            <Image src={emptyHeart} alt="empty_heart" width={15} height={15} />
          </button>
        )}
        <span className="text-sm ml-1 text-soma-grey-49">{currentLikeNum}</span>
      </div>
    </div>
  );
}
