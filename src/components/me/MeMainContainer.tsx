'use client';

import { Memo } from '@/types';
import MemosGrid from '../memo/MemosGrid';
import BarBtn from '../shared/BarBtn';
import { useState } from 'react';
import { getLikedMemosByUserId, getMemosByUserId } from '@/service/me';

type Props = {
  memos: Memo[];
  userId: number;
};

export default function MeMainContainer({ memos, userId }: Props) {
  const [memodata, setMemodata] = useState(memos);
  const [selected, setSelected] = useState('내 글');
  const handleClick = async (type: string) => {
    const memos =
      type === '내 글'
        ? await getMemosByUserId(userId)
        : await getLikedMemosByUserId(userId);
    setMemodata(memos);
    setSelected(type);
  };

  return (
    <div className="grow w-full sm:px-4 sm:py-2">
      {/* <h3 className="font-bold text-lg sm:text-2xl mb-1 my-1 text-center sm:text-start">
        My Memos dd
      </h3> */}
      <div className="flex w-full justify-around my-4">
        <BarBtn
          text="내 글"
          onClick={() => handleClick('내 글')}
          isSelected={selected === '내 글'}
        />
        <BarBtn
          text="좋아요"
          onClick={() => handleClick('좋아요')}
          isSelected={selected === '좋아요'}
        />
      </div>
      <MemosGrid memos={memodata} colNum={3} />
    </div>
  );
}
