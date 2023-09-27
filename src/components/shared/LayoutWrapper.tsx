import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  paddingY?: string;
  bgColor?: string;
};

export default function LayoutWrapper({
  children,
  paddingY = 'sm:py-5',
  bgColor = 'bg-white',
}: Props) {
  return (
    <div className={`${bgColor} min-h-for-fit-screen h-full`}>
      <div className={`max-w-screen-xl mx-auto ${paddingY} sm:px-5`}>
        {children}
      </div>
    </div>
  );
}
