import { getImageSrcFromRank } from '@/service/rank';
import Image from 'next/image';

const rank = 'INFINITY_1';

export default function Rank() {
  return (
    <div className="flex items-center">
      <Image src={getImageSrcFromRank(rank)} alt="rank" width={25} />
      <span
        className={`font-semibold 
  ${
    {
      BRONZE: 'text-rank-bronze',
      SILVER: 'text-rank-silver',
      GOLD: 'text-rank-gold',
      PLATINUM: 'text-rank-platinum',
      DIAMOND: 'text-rank-diamond',
      INFINITY: 'text-rank-infinity mx-1',
    }[rank.replace('_', '').slice(0, -1)]
  }`}
      >
        {rank.replace('_', '')}
      </span>
    </div>
  );
}
