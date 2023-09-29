import Image from 'next/image';
import Link from 'next/link';
import basicProfileImg from '@/assets/profile.svg';
import fillHeart from '@/assets/icons/heart_fill.svg';

type Props = {
  createdDate: string;
  authorName: string;
  likeNum: number;
  imagePath: string;
  authorId: number;
};

export default function QuestionCardHeader({
  createdDate,
  authorName,
  likeNum,
  imagePath,
  authorId,
}: Props) {
  return (
    <div className="flex justify-between">
      <div className="flex items-center">
        <Link href={`/me/${authorId}`}>
          <Image
            src={imagePath ?? basicProfileImg}
            alt="profileImg"
            width={36}
            height={36}
            className="rounded-full w-9 h-9 object-cover"
          />
        </Link>
        <div className="ml-2">
          <h4 className="text-soma-grey-60 font-medium">{authorName}</h4>
          <p className="text-xs text-soma-grey-49">{createdDate}</p>
        </div>
      </div>
      <div className="flex items-center">
        <Image src={fillHeart} alt="fill_heart" width={16} height={16} />
        <p className="text-soma-grey-49 text-xs w-5 text-center ml-0.5">
          {likeNum}
        </p>
      </div>
    </div>
  );
}
