import Image from 'next/image';
import basicProfileImg from '@/assets/profile.svg';
import Link from 'next/link';
import fillHeart from '@/assets/icons/heart_fill.svg';
import emptyHeart from '@/assets/icons/heart_empty.svg';
import { useState } from 'react';
import { likeComment, unlikeComment } from '@/service/like';

type Props = {
  commentId: number;
  authorId: number;
  authorImagePath: string;
  authorName: string;
  createdDate: string;
  isLike: boolean;
  likeNum: number;
};

export default function CommentHeader({
  commentId,
  authorId,
  authorImagePath,
  authorName,
  createdDate,
  isLike,
  likeNum,
}: Props) {
  const [currentIsLikeNum, setCurrentIsLikeNum] = useState(likeNum);
  const [currentIsLike, setCurrentIsLike] = useState(isLike);

  const handleClickLike = () => {
    unlikeComment(commentId, false);
    setCurrentIsLikeNum((pre) => pre - 1);
    setCurrentIsLike(false);
  };

  const handleClickUnlike = () => {
    likeComment(commentId, false);
    setCurrentIsLikeNum((pre) => pre + 1);
    setCurrentIsLike(true);
  };

  return (
    <div className="flex justify-between px-3">
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
          <Image
            src={fillHeart}
            alt="fill_heart"
            width={15}
            height={15}
            onClick={handleClickLike}
          />
        ) : (
          <Image
            src={emptyHeart}
            alt="empty_heart"
            width={15}
            height={15}
            onClick={handleClickUnlike}
          />
        )}
        <span className="text-sm ml-1 text-soma-grey-49">
          {currentIsLikeNum}
        </span>
      </div>
    </div>
  );
}
