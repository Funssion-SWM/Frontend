import Image from 'next/image';
import exampleImg from '../../../public/img/profile.png';
import fillHeart from '../../assets/icons/heart_fill.svg';

type Props = {
  createDate: string;
  authorName: string;
  likes: number;
};

export default function MemoCardHeader({
  createDate,
  authorName,
  likes,
}: Props) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <Image
          src={exampleImg}
          alt="exampleImg"
          height={35}
          className="rounded-full"
        />
        <div className="ml-2">
          <h4>{authorName}</h4>
          <p className="text-xs text-gray-600">{createDate}</p>
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
