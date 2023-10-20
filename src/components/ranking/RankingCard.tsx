import { getImageSrcFromRank } from '@/service/rank';
import { Rank } from '@/types/rank';
import Image from 'next/image';
import { AiOutlineSmile } from 'react-icons/ai';
import basicProfileImg from '@/assets/profile.svg';

type Props = {
  rankNum: number;
  nickname: string;
  tier: Rank;
  score: number;
  isMine: boolean;
  profileImagePath: string;
};

export default function RankingCard({
  rankNum,
  nickname,
  tier,
  score,
  isMine,
  profileImagePath,
}: Props) {
  return (
    <div
      className={`flex justify-between items-center p-2 rounded-lg  ${
        {
          1: 'bg-soma-blue-40 text-white font-bold',
          2: 'bg-soma-blue-30 font-semibold',
          3: 'bg-soma-blue-20 font-medium',
          4: 'bg-soma-grey-20',
          5: 'bg-soma-grey-20',
          6: 'bg-soma-grey-20',
          7: 'bg-soma-grey-20',
          8: 'bg-soma-grey-20',
          9: 'bg-soma-grey-20',
          10: 'bg-soma-grey-20',
        }[rankNum]
      }`}
    >
      <div className="flex items-center">
        <div>{rankNum}위</div>
        <Image
          src={profileImagePath ?? basicProfileImg}
          alt="profileImg"
          width={20}
          height={20}
          className="mx-2 w-5 h-5 rounded-full"
        />
        <div>{nickname}</div>
        <Image src={getImageSrcFromRank(tier)} alt="rankIcon" />
        {isMine && <AiOutlineSmile className="text-2xl" />}
      </div>
      <div>{score}</div>
    </div>
  );
}
