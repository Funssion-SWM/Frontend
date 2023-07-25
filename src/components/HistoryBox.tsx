type Props = {
  item: {
    date: string;
    postCnt: number;
  };
};

export default function HistoryBox({ item }: Props) {
  return (
    <div
      className={`w-5 h-5 rounded-sm group relative ${
        {
          0: 'bg-blue-50',
          1: 'bg-blue-100',
          2: 'bg-blue-200',
          3: 'bg-blue-300',
          4: 'bg-blue-400',
          5: 'bg-blue-500',
          6: 'bg-blue-600',
          7: 'bg-blue-700',
          8: 'bg-blue-800',
          9: 'bg-blue-900',
          10: 'bg-blue-950',
        }[(item.postCnt >= 10 && 10) || item.postCnt % 10]
      }`}
    >
      <div className="w-20 bg-gray-800 text-white absolute -top-10 invisible group-hover:visible z-10 text-xs rounded-md p-1">
        <p>{item.date}</p>
        <p>{item.postCnt} Post</p>
      </div>
    </div>
  );
}
