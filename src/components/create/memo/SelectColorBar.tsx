import { COLORS } from '@/constants/general';
import ColorCircle from './ColorCircle';
import { MemoColor } from '@/types/memo';

type Props = {
  selected: MemoColor;
  onClick: (color: MemoColor) => void;
};

export default function SelectColorBar({ selected, onClick }: Props) {
  return (
    <div className="flex gap-1 mt-2 mb-1.5 mx-4">
      {COLORS.map((color) => (
        <ColorCircle
          key={color}
          color={color}
          selected={selected}
          onClick={(color) => onClick(color)}
        />
      ))}
    </div>
  );
}
