type Props = {
  text: string;
  onClick: () => void;
};

export default function LightBlueBtn({ text, onClick }: Props) {
  return (
    <button
      className="bg-soma-blue-20 text-soma-blue-50 py-2 px-3.5 rounded-3xl mx-1"
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
}
