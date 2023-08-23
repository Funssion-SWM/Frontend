import { COLORS } from '@/utils/const';
import ColorCircle from './ColorCircle';

type Props = {
  selected: string;
  onClick: (color: string) => void;
};

export default function SelectColorBar({ selected, onClick }: Props) {
  return (
    <div className="flex gap-1 mt-2 mx-4">
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
