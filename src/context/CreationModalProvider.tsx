'use client';

import { ReactNode, createContext, useState } from 'react';

type Props = {
  children: ReactNode;
};

export const CreationModalContext = createContext<{
  isOpen: boolean;
  openCreationModal: () => void;
  closeCreationModal: () => void;
}>({
  isOpen: false,
  openCreationModal: () => {},
  closeCreationModal: () => {},
});

export default function CreationModalProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const openCreationModal = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeCreationModal = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <CreationModalContext.Provider
      value={{ isOpen, openCreationModal, closeCreationModal }}
    >
      {children}
    </CreationModalContext.Provider>
  );
}
