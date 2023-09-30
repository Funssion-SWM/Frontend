import Image from 'next/image';
import Link from 'next/link';
import basicProfileImg from '@/assets/profile.svg';
import fillHeart from '@/assets/icons/heart_fill.svg';
import { formatDate } from '@/service/time';
import { QuestionCardSize } from '@/types/question';

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
        <Link href={`/me/${authorId}`}>
          <Image
            src={imagePath ?? basicProfileImg}
            alt="profileImg"
            width={size === 'big' ? 36 : 28}
            height={size === 'big' ? 36 : 28}
            className={`rounded-full object-cover ${
              size === 'big' ? 'w-9 h-9' : 'w-7 h-7'
            }`}
          />
        </Link>
        <div className={`ml-2 ${size === 'small' && 'text-xs'}`}>
          <h4 className="text-soma-grey-60 font-medium">{authorName}</h4>
          <p className="text-xs text-soma-grey-49">
            {formatDate(createdDate, 'YMD')}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <Image src={fillHeart} alt="fill_heart" width={15} height={15} />
        <span className="text-soma-grey-49 text-sm text-center ml-1">
          {likeNum}
        </span>
      </div>
    </div>
  );
}
