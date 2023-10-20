import { RankingInfo } from '@/types/rank';
import RankingCard from './RankingCard';

type Props = {
  top10Ranking: RankingInfo[];
  myId: number;
};

export default function RankingContainer({ top10Ranking, myId }: Props) {
  return (
    <div className="flex flex-col w-full items-center">
      <h1 className="text-2xl font-semibold my-5">Ranking</h1>
      <ul className="flex flex-col w-full sm:w-[600px] gap-2">
        {top10Ranking.map((item, idx) => (
          <li key={item.memberProfileEntity.userId}>
            <RankingCard
              rankNum={idx + 1}
              nickname={item.memberProfileEntity.nickname}
              tier={item.scoreRank.rank}
              score={item.scoreRank.score}
              isMine={myId === item.memberProfileEntity.userId}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
