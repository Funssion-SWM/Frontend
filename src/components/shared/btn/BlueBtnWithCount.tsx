type Props = {
    text: string;
    count?: number;
    onClickBtn: () => void;
    onClickCount: () => void;
    extraStyle?: string;
  };
  
  export default function BlueBtnWithCount({ text, count = 0, onClickBtn, onClickCount, extraStyle = '' }: Props) {
    return (
      <span className={extraStyle}>
        <button
          type="button"
          className={`bg-soma-blue-40 text-white pl-3.5 pr-2 py-2 rounded-l-3xl transition hover:bg-soma-blue-50 text-sm sm:text-base`}
          onClick={() => onClickBtn()}
        >
          {text}
        </button>
        <button
          type="button"
          className={`bg-soma-blue-40 text-white pr-3.5 pl-2 py-2 rounded-r-3xl transition hover:bg-soma-blue-50 text-sm sm:text-base`}
          onClick={() => onClickCount()}
        >
          {count}
        </button>
      </span>
    );
  }
  