import Image from 'next/image';
import exampleImg from '../../public/img/wade.jpeg';
import { AiFillHeart } from 'react-icons/ai';

type Props = {
  createDate: string;
  authorName: string;
};

export default function MemoCardHeader({ createDate, authorName }: Props) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <Image
          src={exampleImg}
          alt="exampleImg"
          height={40}
          className="rounded-full"
        />
        <div className="ml-1">
          <h4>{authorName}</h4>
          <p className="text-sm text-gray-600">{createDate}</p>
        </div>
      </div>
      <div className="flex items-center">
        <AiFillHeart className="w-5 h-5 text-red-500 mr-1" />
        <p>9999+</p>
      </div>
    </div>
  );
}
