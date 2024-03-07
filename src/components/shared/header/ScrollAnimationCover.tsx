'use client';

import { useScrollDirection } from '@/hooks/useScrollDirection';

type Props = {
  children: React.ReactNode;
};

export default function ScrollAnimationCover({ children }: Props) {
  const scrollDirection = useScrollDirection();

  return (
    <header
      className={`sticky top-0 bg-white z-10 transition-all ease-in-out duration-300 ${
        scrollDirection === 'down' && 'opacity-0 invisible'
      }`}
    >
      {children}
    </header>
  );
}
