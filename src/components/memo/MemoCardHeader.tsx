import Image from 'next/image';
import Link from 'next/link';
import RelativeDate from '../shared/RelativeDate';
import { azertMono } from '@/styles/fonts';
import { getImageSrcFromRank } from '@/utils/rank';
import { Rank } from '@/types/rank';
import { DefaultProfile, HeartFill } from '@/assets/svg';

type Props = {
  createDate: string;
  authorName: string;
  likes: number;
  imagePath: string;
  authorId: number;
  authorRank: Rank;
};

export default function MemoCardHeader({
  createDate,
  authorName,
  likes,
  imagePath,
  authorId,
  authorRank,
}: Props) {
  return (
    <div className="flex items-center justify-between h-10">
      <div className="flex items-center">
        <div className="relative">
          <Link href={`/me/${authorId}`} prefetch={false}>
            <Image
              src={imagePath ?? DefaultProfile}
              alt="profileImg"
              width={40}
              height={40}
              className="object-cover w-10 h-10 rounded-full"
            />
          </Link>
          <Image
            src={getImageSrcFromRank(authorRank)}
            alt="rank"
            width={35}
            height={35}
            className="absolute top-0 -translate-x-1/2 -translate-y-1/2"
          />
        </div>

        <div className="ml-2">
          <h4 className="text-sm font-medium text-soma-grey-60 line-clamp-1">
            {authorName}
          </h4>
          <RelativeDate date={createDate} type="YMD" />
        </div>
      </div>
      <div className="flex items-center">
        <Image src={HeartFill} alt="fill-heart" width={16} height={16} />
        <p
          className={`text-soma-grey-49 text-sm text-center ml-1 ${azertMono.className} `}
        >
          {likes}
        </p>
      </div>
    </div>
  );
}
