import Image from 'next/image';
import basicProfileImg from '@/assets/profile.svg';
import Link from 'next/link';
import LikeBox from '@/components/shared/LikeBox';
import RelativeDate from '@/components/shared/RelativeDate';
import { getImageSrcFromRank } from '@/utils/rank';
import { Rank } from '@/types/rank';

type Props = {
  commentId: number;
  authorId: number;
  authorImagePath: string;
  authorName: string;
  createdDate: string;
  isLike: boolean;
  likeNum: number;
  isRecomment: boolean;
  authorRank: Rank;
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
  authorRank,
}: Props) {
  return (
    <div className={`flex justify-between ${!isRecomment && 'px-3'}`}>
      <div className="flex items-center ">
        <div className="relative">
          <Link href={`/me/${authorId}`} prefetch={false}>
            <Image
              src={authorImagePath ?? basicProfileImg}
              alt="profileImg"
              width={28}
              height={28}
              className="object-cover rounded-full w-7 h-7 "
            />
          </Link>
          <Image
            src={getImageSrcFromRank(authorRank)}
            alt="rank"
            width={20}
            height={20}
            className="absolute top-0 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <div className="ml-2 text-xs">
          <div className="text-soma-grey-60">{authorName}</div>
          <RelativeDate date={createdDate} type="YMDHM" />
        </div>
      </div>
      <LikeBox
        likeNum={likeNum}
        postId={commentId}
        isLike={isLike}
        postType={isRecomment ? 'recomment' : 'comment'}
        iconSize={15}
      />
    </div>
  );
}
