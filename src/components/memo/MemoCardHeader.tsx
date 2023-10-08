import Image from 'next/image';
import basicProfileImg from '@/assets/profile.svg';
import fillHeart from '../../assets/icons/heart_fill.svg';
import Link from 'next/link';
import RelativeDate from '../shared/RelativeDate';

type Props = {
  createDate: string;
  authorName: string;
  likes: number;
  imagePath: string;
  authorId: number;
};

export default function MemoCardHeader({
  createDate,
  authorName,
  likes,
  imagePath,
  authorId,
}: Props) {
  return (
    <div className="flex justify-between h-10 items-center">
      <div className="flex items-center">
        <Link href={`/me/${authorId}`} prefetch={false}>
          <Image
            src={imagePath ?? basicProfileImg}
            alt="profileImg"
            width={40}
            height={40}
            className="rounded-full w-10 h-10 object-cover"
          />
        </Link>
        <div className="ml-2">
          <h4 className="text-soma-grey-60 font-medium">{authorName}</h4>
          <RelativeDate date={createDate} type="YMD" />
        </div>
      </div>
      <div className="flex items-center">
        <Image src={fillHeart} alt="fill_heart" width={16} height={16} />
        <p className="text-soma-grey-49 text-xs w-5 text-center ml-0.5">
          {likes}
        </p>
      </div>
    </div>
  );
}
