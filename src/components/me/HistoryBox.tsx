import { HistoryItem } from '@/types';

type Props = {
  item: HistoryItem;
};

export default function HistoryBox({ item }: Props) {
  return (
    <div
      className={`w-6 h-6 rounded group relative ${
        {
          0: 'bg-soma-blue-10',
          1: 'bg-soma-blue-30',
          2: 'bg-soma-blue-40',
          3: 'bg-soma-blue-50',
          4: 'bg-soma-blue-60',
        }[(item.postCnt >= 4 && 4) || item.postCnt % 4]
      }`}
    >
      <div className="w-20 bg-gray-800 text-white absolute -top-10 invisible group-hover:visible z-10 text-xs rounded-md p-1">
        <p>{item.date}</p>
        <p>{item.postCnt} Post</p>
      </div>
    </div>
  );
}
