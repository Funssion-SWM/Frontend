import ProgressBar from '@ramonak/react-progress-bar';
import '@/styles/progressbar.css';

const rank = 'INFINITY_1';

export default function MyProgressBar() {
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs font-semibold text-soma-grey-50 mb-1">
        <span>0</span>
        <span>100</span>
      </div>
      <ProgressBar
        completed={50}
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
