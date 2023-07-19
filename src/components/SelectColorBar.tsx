import ColorCricle from './ColorCricle';

type Props = {
  colors: string[];
  selected: string;
  onClick: (color: string) => void;
};

export default function SelectColorBar({ colors, selected, onClick }: Props) {
  return (
    <div className="flex gap-1 mt-2 mx-4">
      {colors.map((color) => (
        <ColorCricle
          key={color}
          color={color}
          selected={selected}
          onClick={(color) => onClick(color)}
        />
      ))}
    </div>
  );
}
