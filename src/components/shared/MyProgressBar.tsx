import ProgressBar from '@ramonak/react-progress-bar';
import '@/styles/progressbar.css';

const rank = 'INFINITY_1';

export default function MyProgressBar() {
  return (
    <div className="w-full">
      <ProgressBar
        completed={20}
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
        className="w-full"
      />
      <div className="flex justify-between text-sm text-soma-grey-50 my-1">
        <span>0</span>
        <span>100</span>
      </div>
    </div>
  );
}
