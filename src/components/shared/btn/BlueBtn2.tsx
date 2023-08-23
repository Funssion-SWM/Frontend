type Props = {
  text: string;
  onClick: () => void;
  extraStyle?: string;
};

export default function BlueBtn2({ text, onClick, extraStyle = '' }: Props) {
  return (
    <button
      type="button"
      className={`bg-white text-soma-blue-50 border-soma-grey-40 border-2 px-3.5 py-2 rounded-3xl transition hover:bg-soma-grey-40 ${extraStyle}`}
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
}
