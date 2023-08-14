import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  paddingY?: string;
  bgColor?: string;
};

export default function LayoutWrapper({ children, paddingY, bgColor }: Props) {
  return (
    <div className={`${bgColor} min-h-screen h-full`}>
      <div className={`max-w-screen-xl mx-auto ${paddingY} sm:px-5`}>
        {children}
      </div>
    </div>
  );
}
