import { ButtonSize } from '@/types';

type Props = {
  text: string;
  onClick: () => void;
  size?: ButtonSize;
  extraStyle?: string;
};

export default function BlueBtn({
  text,
  onClick,
  size = 'medium',
  extraStyle = '',
}: Props) {
  return (
    <button
      className={`bg-soma-blue-40 text-white px-3.5 py-2 rounded-3xl transition hover:bg-soma-blue-50 ${
        {
          big: 'text-sm sm:text-base',
          medium: 'text-xs sm:text-sm',
          small: 'text-[10px] sm:text-xs',
        }[size]
      }  ${extraStyle} `}
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
}
