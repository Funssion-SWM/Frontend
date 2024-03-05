'use client';

import { Close } from '@/assets/svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Props = {
  extraClass?: string;
  onClick?: () => void;
  size: number;
};

export default function CloseIcon({ extraClass, onClick, size }: Props) {
  const router = useRouter();

  return (
    <button className={extraClass}>
      <Image
        className="cursor-pointer"
        width={size}
        height={size}
        src={Close}
        alt="close-icon"
        onClick={onClick ? onClick : () => router.back()}
      />
    </button>
  );
}
