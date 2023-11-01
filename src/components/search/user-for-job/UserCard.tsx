import { getImageSrcFromRank } from '@/service/rank';
import { UserForJobInfo } from '@/types/userForJob';
import Image from 'next/image';
import Link from 'next/link';
import basicProfileImg from '@/assets/profile.svg';
import { StackInfo } from '@/types/coverletter';

type Props = {
  userForJobInfo: UserForJobInfo;
};

export default function UserCard({ userForJobInfo }: Props) {
  const { id, introduce, name, rank, imagePath, developmentArea, techStack } =
    userForJobInfo;

  const parsingTechStacks: StackInfo[] = JSON.parse(techStack);
  return (
    <div className="flex flex-col justify-between relative rounded-md shadow-md aspect-square">
      <div className="flex justify-between px-3 pt-3">
        <div className="flex items-center gap-2">
          <Link href={`/`} prefetch={false}>
            <Image
              src={imagePath || basicProfileImg}
              alt="profileImg"
              width={40}
              height={40}
              className="rounded-full w-10 h-10 object-cover"
            />
          </Link>
          <div className="text-soma-grey-60 font-medium text-sm line-clamp-1">
            {name}
          </div>
        </div>
        <Image src={getImageSrcFromRank(rank)} alt="rank" />
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
          미니면접보기
        </button>
      </div>
    </div>
  );
}
