type Props = {
  color: string;
  selected: string;
  onClick: (color: string) => void;
};

export default function ColorCricle({ color, selected, onClick }: Props) {
  return (
    <div
      onClick={() => onClick(color)}
      className={`w-6 h-6 rounded-full cursor-pointer ${color} ${
        selected === color && 'border-2 border-black'
      }`}
    ></div>
  );
}
