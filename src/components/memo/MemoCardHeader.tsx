import Image from 'next/image';
import exampleImg from '../../../public/img/profile.png';
import { AiFillHeart } from 'react-icons/ai';
import FillHeart from '../ui/icons/fill-heart';
import OutlineHeart from '../ui/icons/outline-heart';

type Props = {
  createDate: string;
  authorName: string;
  likes: number;
};

export default function MemoCardHeader({ createDate, authorName, likes }: Props) {
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
        <FillHeart className="w-5 h-5 text-red-500 mr-2" />
        <p>{likes}</p>
      </div>
    </div>
  );
}
