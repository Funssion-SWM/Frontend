import { ButtonSize } from '@/types/common';
import Link from 'next/link';

type Props = {
  text: string;
  href: string;
  size?: ButtonSize;
  isSelected: boolean;
};

export default function CategoryLink({
  text,
  href,
  size = 'medium',
  isSelected,
}: Props) {
  return (
    <Link
      href={href}
      className={` py-1 px-3.5 transition ${
        {
          big: 'text-sm sm:text-base',
          medium: 'text-xs sm:text-sm',
          small: 'text-[10px] sm:text-xs',
        }[size]
      }
    ${
      isSelected
        ? 'border-soma-blue-50 text-soma-blue-50 font-semibold border-2 rounded-3xl'
        : 'border-soma-grey-40 bg-white hover:border-soma-blue-50 hover:text-soma-blue-50'
    }`}
    >
      {text}
    </Link>
  );
}
