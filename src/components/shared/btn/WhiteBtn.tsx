import { ButtonSize } from '@/types/common';

type Props = {
  text: string;
  onClick: () => void;
  size?: ButtonSize;
  extraStyle?: string;
};

export default function WhiteBtn({
  text,
  onClick,
  size = 'medium',
  extraStyle = '',
}: Props) {
  return (
    <button
      type="button"
      className={`bg-white text-soma-blue-50 border-soma-grey-40 border-[1px] px-3.5 py-2 rounded-3xl transition hover:bg-soma-grey-40 w-fit ${
        {
          big: 'text-sm sm:text-base',
          medium: 'text-xs sm:text-sm',
          small: 'text-[10px] sm:text-xs',
        }[size]
      } ${extraStyle}`}
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
}
