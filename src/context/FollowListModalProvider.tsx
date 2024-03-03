'use client';

import { UserInfo } from '@/types/auth';
import { ReactNode, createContext, useState } from 'react';

type Props = {
  children: ReactNode;
  followings: UserInfo[];
  followers: UserInfo[];
};

export const FollowListModalContext = createContext<{
  isOpen: boolean;
  open: (type: 'following' | 'follower') => void;
  close: () => void;
  type: 'following' | 'follower';
  currentFollowings: UserInfo[];
  currentFollowers: UserInfo[];
  handleClickFollow: (user: UserInfo) => void;
  handleClickUnfollow: (user: UserInfo) => void;
  handleCancelFollowing: (userId: number) => void;
}>({
  isOpen: false,
  open: () => {},
  close: () => {},
  type: 'following',
  currentFollowings: [],
  currentFollowers: [],
  handleClickFollow: () => {},
  handleClickUnfollow: () => {},
  handleCancelFollowing: () => {},
});

export default function FollowListModalProvider({
  children,
  followings,
  followers,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<'following' | 'follower'>('following');
  const [currentFollowings, setCurrentFollowings] =
    useState<UserInfo[]>(followings);
  const [currentFollowers, setCurrentFollowwers] =
    useState<UserInfo[]>(followers);

  const open = (type: 'following' | 'follower') => {
    setIsOpen(true);
    setType(type);
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleClickFollow = (user: UserInfo) => {
    setCurrentFollowwers((pre) => [...pre, user]);
  };

  const handleClickUnfollow = (user: UserInfo) => {
    setCurrentFollowwers((pre) =>
      pre.filter((follower) => follower.userId !== user.userId)
    );
  };

  const handleCancelFollowing = (userId: number) => {
    setCurrentFollowings((pre) =>
      pre.filter((following) => following.userId !== userId)
    );
  };

  return (
    <FollowListModalContext.Provider
      value={{
        isOpen,
        open,
        close,
        type,
        currentFollowings,
        currentFollowers,
        handleClickFollow,
        handleClickUnfollow,
        handleCancelFollowing,
      }}
    >
      {children}
    </FollowListModalContext.Provider>
  );
}
