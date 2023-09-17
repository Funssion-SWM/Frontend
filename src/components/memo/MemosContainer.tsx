'use client';

import { Memo } from '@/types/memo';
import { Orderby } from '@/types';
import MemosGrid from './MemosGrid';
import { useState } from 'react';
import { getMemos } from '@/service/memos';
import CategoryBtn from '@/components/shared/btn/CategoryBtn';

type Props = {
  memos: Memo[];
};

export default function MemosContainer({ memos }: Props) {
  const [memoData, setMemodata] = useState(memos);
  const [selectedOrderType, setSelectedOrderType] = useState<Orderby>('new');

  const handleClick = async (orderBy: Orderby) => {
    const memos = await getMemos('month', orderBy);
    setMemodata(memos);
    setSelectedOrderType(orderBy);
  };

  return (
    <div>
      <div className="flex gap-2 my-2 ml-1 sm:mb-5">
        <CategoryBtn
          text="New✨"
          onClick={() => handleClick('new')}
          isSelected={selectedOrderType === 'new'}
        />
        <CategoryBtn
          text="Hot🔥"
          onClick={() => handleClick('hot')}
          isSelected={selectedOrderType === 'hot'}
        />
      </div>
      <MemosGrid memos={memoData} colNum={4} />
    </div>
  );
}
