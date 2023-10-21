import ProgressBar from '@ramonak/react-progress-bar';
import '@/styles/progressbar.css';
import { Rank } from '@/types/rank';

type Props = {
  rank: Rank;
  rankMinScore: number;
  rankMaxScore: number;
  currentRankPercentage: number;
};
export default function MyProgressBar({
  rank,
  rankMinScore,
  rankMaxScore,
  currentRankPercentage,
}: Props) {
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs font-semibold text-soma-grey-50 mb-1">
        <span>{rankMinScore}</span>
        <span>{rankMaxScore}</span>
      </div>
      <ProgressBar
        completed={currentRankPercentage}
        bgColor={`${
          {
            BRONZE: 'var(--rank-bronze)',
            SILVER: 'var(--rank-silver)',
            GOLD: 'var(--rank-gold)',
            PLATINUM: 'var(--rank-platinum)',
            DIAMOND: 'var(--rank-diamond)',
            INFINITY: 'var(--rank-infinity)',
          }[rank.replace('_', '').slice(0, -1)]
        }`}
        labelClassName="label"
        labelAlignment="outside"
        className="w-full"
      />
    </div>
  );
}
