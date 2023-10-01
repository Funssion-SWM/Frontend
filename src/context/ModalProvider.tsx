'use client';

import { ReactNode, createContext, useState } from 'react';

type Props = {
  children: ReactNode;
};

export const ModalContext = createContext<{
  isOpen: boolean;
  open: (text: string, onSuccess: () => void) => void;
  close: () => void;
  modalText: string;
  onSuccess: () => void;
}>({
  isOpen: false,
  open: () => {},
  close: () => {},
  modalText: '',
  onSuccess: () => {},
});

export default function ModalProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState('');
  const [onSuccess, setOnSuccess] = useState<() => void>(() => {});

  const open = (text: string, callback: () => void) => {
    setIsOpen(true);
    setModalText(text);
    setOnSuccess(() => {
      return callback;
    });
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <ModalContext.Provider
      value={{ isOpen, open, close, modalText, onSuccess }}
    >
      {children}
    </ModalContext.Provider>
  );
}
