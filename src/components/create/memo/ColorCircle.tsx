import { MemoColor } from '@/types';

type Props = {
  color: MemoColor;
  selected: MemoColor;
  onClick: (color: MemoColor) => void;
};

export default function ColorCricle({ color, selected, onClick }: Props) {
  return (
    <div
      onClick={() => onClick(color)}
      className={`w-6 h-6 rounded-full cursor-pointer border-[1px] border-black ${
        {
          yellow: 'bg-memo-yellow',
          green: 'bg-memo-green',
          skyblue: 'bg-memo-skyblue',
          orange: 'bg-memo-orange',
          pink: 'bg-memo-pink',
          navy: 'bg-memo-navy',
          purple: 'bg-memo-purple',
        }[color]
      } ${
        selected === color
          ? 'border-[2px] border-soma-blue-50 text-soma-blue-50 text-center'
          : ''
      }`}
    >
      {selected === color && '✓'}
    </div>
  );
}
