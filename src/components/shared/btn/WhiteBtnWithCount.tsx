type Props = {
  text: string;
  count?: number;
  onClickBtn: () => void;
  onClickCount: () => void;
  extraStyle?: string;
};

export default function WhiteBtnWithCount({
  text,
  count = 0,
  onClickBtn,
  onClickCount,
  extraStyle = '',
}: Props) {
  return (
    <span className={extraStyle}>
      <button
        type="button"
        className={`bg-white text-soma-blue-50 border-soma-grey-40 border-r-0 border-[1px] pl-3.5 pr-1 py-2 rounded-l-3xl transition hover:bg-soma-grey-40 text-xs sm:text-sm`}
        onClick={() => onClickBtn()}
      >
        {text}
      </button>
      <button
        type="button"
        className={`bg-white text-soma-blue-50 border-soma-grey-40 border-l-0 border-[1px] pr-3.5 pl-1 py-2 rounded-r-3xl transition hover:bg-soma-grey-40 text-xs sm:text-sm`}
        onClick={() => onClickCount()}
      >
        {count}
      </button>
    </span>
  );
}
