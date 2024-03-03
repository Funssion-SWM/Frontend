import Image from 'next/image';
import Link from 'next/link';
import { QuestionCardSize } from '@/types/question';
import RelativeDate from '../shared/RelativeDate';
import { azertMono } from '@/styles/fonts';
import { Rank } from '@/types/rank';
import { getImageSrcFromRank } from '@/utils/rank';
import { DefaultProfile, HeartFill } from '@/assets/svg';

type Props = {
  createdDate: string;
  authorName: string;
  likeNum: number;
  imagePath: string;
  authorId: number;
  size: QuestionCardSize;
  authorRank: Rank;
};

export default function QuestionCardHeader({
  createdDate,
  authorName,
  likeNum,
  imagePath,
  authorId,
  size,
  authorRank,
}: Props) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="relative">
          <Link href={`/me/${authorId}`} prefetch={false}>
            <Image
              src={imagePath ?? DefaultProfile}
              alt="profileImg"
              width={30}
              height={30}
              className={'rounded-full object-cover w-8 h-8'}
            />
          </Link>
          <Image
            src={getImageSrcFromRank(authorRank)}
            alt="rank"
            width={25}
            height={25}
            className="absolute top-0 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <div className={'ml-2'}>
          <h4
            className={`text-soma-grey-60 font-medium text-xs ${
              size === 'big' && 'sm:text-sm'
            }`}
          >
            {authorName}
          </h4>
          <RelativeDate date={createdDate} type="YMD" />
        </div>
      </div>
      <div className="flex items-center">
        <Image src={HeartFill} alt="fill-heart" width={15} height={15} />
        <span
          className={`text-soma-grey-49 text-sm text-center ml-1 ${azertMono.className} `}
        >
          {likeNum}
        </span>
      </div>
    </div>
  );
}
