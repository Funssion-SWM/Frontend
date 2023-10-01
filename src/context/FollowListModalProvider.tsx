'use client';

import { ReactNode, createContext, useState } from 'react';

type Props = {
  children: ReactNode;
};

export const FollowListModalContext = createContext<{
  isOpen: boolean;
  open: (
    type: 'following' | 'follower',
    list: any[],
    onCancel: () => void,
    isMine: boolean
  ) => void;
  close: () => void;
  type: 'following' | 'follower';
  listData: any[];
  onCancel: () => void;
  isMine: boolean;
}>({
  isOpen: false,
  open: () => {},
  close: () => {},
  type: 'following',
  listData: [],
  onCancel: () => {},
  isMine: false,
});

export default function FollowListModalProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<'following' | 'follower'>('following');
  const [listData, setListData] = useState<any[]>([]);
  const [onCancel, setOnCancel] = useState<() => void>(() => {});
  const [isMine, setIsMine] = useState(false);

  const open = (
    type: 'following' | 'follower',
    list: any[],
    callback: () => void,
    isMine: boolean
  ) => {
    setIsOpen(true);
    setType(type);
    setListData(list);
    setIsMine(isMine);
    setOnCancel(() => {
      return callback;
    });
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <FollowListModalContext.Provider
      value={{
        isOpen,
        open,
        close,
        type,
        listData,
        onCancel,
        isMine,
      }}
    >
      {children}
    </FollowListModalContext.Provider>
  );
}
