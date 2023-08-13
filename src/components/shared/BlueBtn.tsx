type Props = {
  text: string;
  onClick: () => void;
  extraStyle?: string;
};

export default function BlueBtn({ text, onClick, extraStyle = '' }: Props) {
  return (
    <button
      className={`bg-soma-blue-40 text-white px-3.5 py-2 rounded-3xl transition hover:bg-soma-blue-50 text-sm sm:text-base ${extraStyle} `}
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
}
