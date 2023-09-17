import { ButtonSize } from '@/types';

type Props = {
  text: string;
  onClick: () => void;
  size?: ButtonSize;
  isSelected: boolean;
};

export default function CategoryBtn({
  text,
  onClick,
  size = 'medium',
  isSelected,
}: Props) {
  return (
    <button
      className={`border-2 py-2 px-3.5 rounded-3xl transition ${
        {
          big: 'text-sm sm:text-base',
          medium: 'text-xs sm:text-sm',
          small: 'text-[10px] sm:text-xs',
        }[size]
      }
      ${
        isSelected
          ? 'border-soma-blue-50 text-soma-blue-50 bg-soma-blue-10 font-semibold'
          : 'border-soma-grey-40 bg-white hover:border-soma-blue-50 hover:text-soma-blue-50 hover:bg-soma-blue-10'
      }`}
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
}
