import { getImageSrcFromRank } from '@/service/rank';
import { UserForJobInfo } from '@/types/userForJob';
import Image from 'next/image';
import Link from 'next/link';
import basicProfileImg from '@/assets/profile.svg';
import { StackInfo } from '@/types/coverletter';
import fillHeart from '@/assets/icons/heart_fill.svg';
import emptyHeart from '@/assets/icons/heart_empty.svg';
import { likeEmployee, unlikeEmployee } from '@/service/like';
import { notifyToast } from '@/service/notify';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  userForJobInfo: UserForJobInfo;
};

export default function UserCard({ userForJobInfo }: Props) {
  const {
    id,
    introduce,
    name,
    rank,
    imagePath,
    developmentArea,
    techStack,
    isLike,
    description,
  } = userForJobInfo;
  const [cureentIsLike, setCurrentIsLike] = useState(isLike);

  const parsingTechStacks: StackInfo[] = JSON.parse(techStack);

  const router = useRouter();
  const handleClickLike = () => {
    unlikeEmployee(id).then((res) => {
      if ('code' in res) {
        if (res.code === 401) router.push('/login');
        notifyToast(res.message, 'error');
        return;
      }
      setCurrentIsLike(false);
    });
  };
  const handleClickUnlike = () => {
    likeEmployee(id).then((res) => {
      if ('code' in res) {
        if (res.code === 401) router.push('/login');
        notifyToast(res.message, 'error');
        return;
      }
      setCurrentIsLike(true);
    });
  };

  return (
    <div className="flex flex-col justify-between relative rounded-md shadow-md aspect-square">
      <div className="flex justify-between items-center px-3 pt-3">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Link href={`/`} prefetch={false}>
              <Image
                src={imagePath || basicProfileImg}
                alt="profileImg"
                width={40}
                height={40}
                className="rounded-full w-10 h-10 object-cover"
              />
            </Link>
            <Image
              src={getImageSrcFromRank(rank)}
              alt="rank"
              width={35}
              height={35}
              className="absolute top-0 -translate-x-1/2 -translate-y-1/2"
            />
          </div>

          <div className="text-soma-grey-60 font-medium text-sm line-clamp-1">
            {name}
          </div>
        </div>
        <div className="flex items-center">
          {cureentIsLike ? (
            <button onClick={handleClickLike}>
              <Image src={fillHeart} alt="fill_heart" width={20} height={20} />
            </button>
          ) : (
            <button onClick={handleClickUnlike}>
              <Image
                src={emptyHeart}
                alt="empty_heart"
                width={20}
                height={20}
              />
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-3 items-center px-3">
        <div className="font-semibold text-soma-blue-50">{developmentArea}</div>
        <ul className="flex gap-3 overflow-x-auto w-full justify-center">
          {parsingTechStacks.map((item, idx) => {
            return (
              <li
                key={idx}
                className="text-sm font-medium text-soma-blue-40 bg-white border-[1px] border-soma-grey-40 rounded-2xl px-2 py-1"
              >
                {item.stack}
              </li>
            );
          })}
        </ul>
        <p className="text-soma-grey-70 font-semibold line-clamp-3 break-all h-20">
          {introduce}
        </p>
        <div className=" group relative">
          <p className="text-sm text-soma-grey-50">자소서 요약</p>
          <div className="absolute top-0 right-0 sm:left-0 w-[300px] sm:w-[500px] p-3 bg-white opacity-0 pointer-events-none transition-all group-hover:opacity-100 group-hover:pointer-events-auto rounded-2xl shadow-lg whitespace-pre-wrap">
            {description}
          </div>
        </div>
      </div>
      <div className="flex">
        <a
          href={`/coverletter/${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-center flex-1 bg-soma-blue-40 text-white font-semibold py-2 hover:brightness-75 transition-all rounded-bl-md"
        >
          자소서 보기
        </a>
        <button className="flex-1 bg-white text-soma-blue-40 font-semibold py-2 hover:brightness-75 transition-all rounded-br-md">
          미니면접 요청
        </button>
      </div>
    </div>
  );
}
