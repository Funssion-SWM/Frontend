'use client';

import { ModalType } from '@/types';
import { ReactNode, createContext, useState } from 'react';

type Props = {
  children: ReactNode;
};

export const ModalContext = createContext<{
  isOpen: boolean;
  open: (text: string, onSuccess: () => void, content?: ReactNode, type?: ModalType) => void;
  close: () => void;
  modalText: string;
  modalContent?: ReactNode;
  modalType?: ModalType; 
  onSuccess: () => void;
}>({
  isOpen: false,
  open: () => {},
  close: () => {},
  modalText: '',
  modalType: 'alert',
  onSuccess: () => {},
});

export default function ModalProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState('');
  const [modalContent, setModalContent] = useState<ReactNode>(undefined);
  const [modalType, setModalType] = useState<ModalType>('alert');
  const [onSuccess, setOnSuccess] = useState<() => void>(() => {});

  const open = (text: string, callback: () => void, content?: ReactNode, type?: ModalType) => {
    setIsOpen(true);
    setModalText(text);
    setModalContent(content);
    setModalType(type ?? 'alert');
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
      value={{ isOpen, open, close, modalText, modalContent, modalType, onSuccess }}
    >
      {children}
    </ModalContext.Provider>
  );
}
