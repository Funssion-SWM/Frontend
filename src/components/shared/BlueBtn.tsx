type Props = {
  text: string;
  onClick: () => void;
  extraStyle?: string;
};

export default function BlueBtn({ text, onClick, extraStyle = '' }) {
  return (
    <button
      className={`bg-soma-blue-40 text-white px-3 py-1 rounded-2xl ${extraStyle}`}
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
}
