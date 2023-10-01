'use client'

import { UserInfo } from '@/types';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type FollowContextType = {
  follows: UserInfo[];
  followers: UserInfo[];
  updateFollows: (newFollows: UserInfo[]) => void;
  followCnt: number;
  followerCnt: number;
  updateFollowCnt: (newFollowCnt: number) => void;
  updateFollowerCnt: (newFollowerCnt: number) => void;
  myId: number;
};

const FollowContext = createContext<FollowContextType | undefined>(undefined);

type FollowProviderProps = {
  children: ReactNode;
  initialFollowCnt: number;
  initialFollowerCnt: number;
  followData: UserInfo[];
  followerData: UserInfo[];
  idData: number;
};

export function FollowProvider({ children, initialFollowCnt, initialFollowerCnt, followData, followerData, idData }: FollowProviderProps) {
  const [followCnt, setFollowCnt] = useState<number>(initialFollowCnt);
  const [followerCnt, setFollowerCnt] = useState<number>(initialFollowerCnt);
  const [follows, setFollows] = useState<UserInfo[]>(followData);
  const [followers] = useState<UserInfo[]>(followerData);
  const [myId] = useState<number>(idData);

  const updateFollowCnt = (newFollowCnt: number) => {
    setFollowCnt(newFollowCnt);
  };

  const updateFollowerCnt = (newFollowerCnt: number) => {
    setFollowerCnt(newFollowerCnt);
  };

  const updateFollows = (newFollows: UserInfo[]) => {
    setFollows(newFollows);
  };

  return (
    <FollowContext.Provider value={{ follows, followers, updateFollows, followCnt, followerCnt, updateFollowCnt, updateFollowerCnt, myId }}>
      {children}
    </FollowContext.Provider>
  );
}

export function useFollowContext() {
  const context = useContext(FollowContext);

  if (!context) {
    throw new Error('useFollowContext must be used within a FollowProvider');
  }

  return context;
}
