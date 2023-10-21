'use client';

import { ReactNode, createContext, useState } from 'react';

type Props = {
  children: ReactNode;
};

export const ScoreDetailContext = createContext<{
  isOpen: boolean;
  openScoreDetail: () => void;
  closeScoreDetail: () => void;
}>({
  isOpen: false,
  openScoreDetail: () => {},
  closeScoreDetail: () => {},
});

export default function ScoreDetailProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const openScoreDetail = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeScoreDetail = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <ScoreDetailContext.Provider
      value={{ isOpen, openScoreDetail, closeScoreDetail }}
    >
      {children}
    </ScoreDetailContext.Provider>
  );
}
