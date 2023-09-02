'use client';

import { Memo } from '@/types/memo';
import { ReactNode, createContext, useState } from 'react';

type Props = {
  children: ReactNode;
};

export const DraftsInModalContext = createContext<{
  isOpen: boolean;
  drafts: Memo[];
  openDrafts: (drafts: Memo[]) => void;
  closeDrafts: () => void;
}>({
  isOpen: false,
  drafts: [],
  openDrafts: () => {},
  closeDrafts: () => {},
});

export default function DraftsInModalProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [drafts, setDrafts] = useState<Memo[]>([]);

  const openDrafts = (drafts: Memo[]) => {
    setIsOpen(true);
    setDrafts(drafts);
    document.body.style.overflow = 'hidden';
  };

  const closeDrafts = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <DraftsInModalContext.Provider
      value={{ isOpen, drafts, openDrafts, closeDrafts }}
    >
      {children}
    </DraftsInModalContext.Provider>
  );
}
