type Props = {
  text: string;
  onClick: () => void;
  isSelected: boolean;
};

export default function CategoryBtn({ text, onClick, isSelected }: Props) {
  return (
    <button
      className={`border-2 texsomb20 py-2 px-4 rounded-3xl transition
          ${
            isSelected
              ? 'border-soma-blue-50 text-soma-blue-50 bg-soma-blue-10'
              : 'border-soma-grey-40 bg-white hover:border-soma-blue-50 hover:text-soma-blue-50 hover:bg-soma-blue-10'
          }`}
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
}
