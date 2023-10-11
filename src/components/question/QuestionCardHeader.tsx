import Image from 'next/image';
import Link from 'next/link';
import basicProfileImg from '@/assets/profile.svg';
import fillHeart from '@/assets/icons/heart_fill.svg';
import { QuestionCardSize } from '@/types/question';
import RelativeDate from '../shared/RelativeDate';
import { azertMono } from '@/styles/fonts';

type Props = {
  createdDate: string;
  authorName: string;
  likeNum: number;
  imagePath: string;
  authorId: number;
  size: QuestionCardSize;
};

export default function QuestionCardHeader({
  createdDate,
  authorName,
  likeNum,
  imagePath,
  authorId,
  size,
}: Props) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <Link href={`/me/${authorId}`} prefetch={false}>
          <Image
            src={imagePath ?? basicProfileImg}
            alt="profileImg"
            width={32}
            height={32}
            className={'rounded-full object-cover w-8 h-8'}
          />
        </Link>
        <div className={'ml-2'}>
          <h4
            className={`text-soma-grey-60 font-medium text-xs ${
              size === 'big' && 'sm:text-base'
            }`}
          >
            {authorName}
          </h4>
          <RelativeDate date={createdDate} type="YMD" />
        </div>
      </div>
      <div className="flex items-center">
        <Image src={fillHeart} alt="fill_heart" width={15} height={15} />
        <span
          className={`text-soma-grey-49 text-sm text-center ml-1 ${azertMono.className} `}
        >
          {likeNum}
        </span>
      </div>
    </div>
  );
}
