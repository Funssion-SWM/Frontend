type Props = {
  text: string;
  onClick: () => void;
  isSelected: boolean;
};

export default function BarBtn({ text, onClick, isSelected }: Props) {
  return (
    <button
      className={`flex-1 font-semibold py-1 transition-all ${
        isSelected
          ? 'text-soma-blue-50 border-b-[2px] border-soma-blue-50 '
          : 'text-soma-grey-50 hover:text-soma-blue-50 transition'
      }`}
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
}
