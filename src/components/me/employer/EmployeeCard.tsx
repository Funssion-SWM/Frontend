import { getImageSrcFromRank } from '@/service/rank';
import { Employee } from '@/types/employer';
import Image from 'next/image';
import Link from 'next/link';
import basicProfileImg from '@/assets/profile.svg';
import { StackInfo } from '@/types/coverletter';
import { useState } from 'react';
import fillHeart from '@/assets/icons/heart_fill.svg';
import emptyHeart from '@/assets/icons/heart_empty.svg';
import { likeEmployee, unlikeEmployee } from '@/service/like';
import { notifyToast } from '@/service/notify';
import { useRouter } from 'next/navigation';

type Props = {
  employee: Employee;
  type: 'liked' | 'ongoing' | 'done';
  onClickResult?: (userId: number) => void;
};

export default function EmployeeCard({ employee, type, onClickResult }: Props) {
  const {
    imagePath,
    rank,
    userId,
    username,
    developmentArea,
    techStack,
    description,
    introduce,
    isVisible,
    email,
  } = employee;

  const parsingTechStacks: StackInfo[] = JSON.parse(techStack);

  const [isLike, setIsLike] = useState(true);
  const router = useRouter();

  const handleClickLike = () => {
    unlikeEmployee(userId).then((res) => {
      if ('code' in res) {
        if (res.code === 401) router.push('/login');
        notifyToast(res.message, 'error');
        return;
      }
      setIsLike(false);
    });
  };
  const handleClickUnlike = () => {
    likeEmployee(userId).then((res) => {
      if ('code' in res) {
        if (res.code === 401) router.push('/login');
        notifyToast(res.message, 'error');
        return;
      }
      setIsLike(true);
    });
  };

  return (
    isVisible && (
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
            <p className="text-soma-grey-60 font-medium text-sm line-clamp-1">
              {username}
            </p>
          </div>
          {type === 'liked' && (
            <div className="flex items-center">
              {isLike ? (
                <button onClick={handleClickLike}>
                  <Image
                    src={fillHeart}
                    alt="fill_heart"
                    width={20}
                    height={20}
                  />
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
          )}
        </div>
        <div className="flex flex-col gap-3 items-center px-3">
          <div className="font-semibold text-soma-blue-50">
            {developmentArea}
          </div>
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
          <p className="text-soma-grey-70 font-semibold line-clamp-3 break-all h-12 overflow-y-auto">
            {introduce}
          </p>
          <p className="text-xs text-soma-grey-60">{email}</p>
          <div className=" group relative">
            <p className="text-sm text-soma-grey-50">자소서 요약</p>
            <div className="absolute top-0 right-0 sm:left-0 w-[300px] sm:w-[500px] p-3 bg-white opacity-0 pointer-events-none transition-all group-hover:opacity-100 group-hover:pointer-events-auto rounded-2xl shadow-lg whitespace-pre-wrap z-10">
              {description}
            </div>
          </div>
        </div>
        <div className="flex">
          <a
            href={`/coverletter/${userId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center flex-1 bg-soma-blue-40 text-white font-semibold py-2 hover:brightness-75 transition-all rounded-bl-md"
          >
            자소서 보기
          </a>
          {type === 'done' && (
            <button
              className="flex-1 bg-white text-soma-blue-40 font-semibold py-2 hover:brightness-75 transition-all rounded-br-md"
              onClick={() => {
                if (onClickResult !== undefined) onClickResult(userId);
              }}
            >
              면접 결과
            </button>
          )}
        </div>
      </div>
    )
  );
}
