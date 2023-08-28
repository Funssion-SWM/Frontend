'use client';

import { Memo } from '@/types/memo';
import { ReactNode, createContext, useState } from 'react';

type Props = {
  children: ReactNode;
};

export const ModalContext = createContext<{
  isOpen: boolean;
  mode: string;
  memos: Memo[];
  open: (text: string, onSuccess: () => void, mode?: string, memos?: Memo[]) => void;
  close: () => void;
  modalText: string;
  onSuccess: () => void;
}>({
  isOpen: false,
  mode: '',
  memos: [],
  open: () => {},
  close: () => {},
  modalText: '',
  onSuccess: () => {},
});

export default function ModalProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState('');
  const [memos, setMemos] = useState<Memo[]>([]);
  const [modalText, setModalText] = useState('');
  const [onSuccess, setOnSuccess] = useState<() => void>(() => {});

  const open = (text: string, callback: () => void, mode?: string, memos?: Memo[]) => {
    setIsOpen(true);
    setModalText(text);
    setMode(mode ? mode : '');
    setMemos(memos ? memos : []);
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
      value={{ isOpen, mode, memos, open, close, modalText, onSuccess }}
    >
      {children}
    </ModalContext.Provider>
  );
}
