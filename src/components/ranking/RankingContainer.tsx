import { RankingInfo } from '@/types/rank';
import RankingCard from './RankingCard';
import Link from 'next/link';

type Props = {
  top10Ranking: RankingInfo[];
  myId: number;
  myRanking: RankingInfo | null;
};

export default function RankingContainer({
  top10Ranking,
  myId,
  myRanking,
}: Props) {
  return (
    <div className="flex flex-col w-full items-center">
      <h1 className="text-2xl font-semibold mb-5">Ranking</h1>
      <ul className="flex flex-col w-full sm:w-[600px] gap-2">
        {top10Ranking.map((item, idx) => (
          <li key={item.memberProfileEntity.userId}>
            <Link href={`/me/${item.memberProfileEntity.userId}`}>
              <RankingCard
                rankNum={item.ranking}
                nickname={item.memberProfileEntity.nickname}
                tier={item.scoreRank.rank}
                score={item.scoreRank.score}
                isMine={myId === item.memberProfileEntity.userId}
                profileImagePath={item.memberProfileEntity.profileImageFilePath}
              />
            </Link>
          </li>
        ))}
      </ul>
      {myRanking !== null && (
        <div className="flex flex-col w-full sm:w-[600px]">
          <h4 className="self-center font-semibold text-lg my-2">My Ranking</h4>
          <Link href={`/me/${myRanking.memberProfileEntity.userId}`}>
            <RankingCard
              rankNum={myRanking.ranking}
              nickname={myRanking.memberProfileEntity.nickname}
              tier={myRanking.scoreRank.rank}
              score={myRanking.scoreRank.score}
              isMine={myId === myRanking.memberProfileEntity.userId}
              profileImagePath={
                myRanking.memberProfileEntity.profileImageFilePath
              }
            />
          </Link>
        </div>
      )}
    </div>
  );
}
