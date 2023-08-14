'use client';

import { Memo } from '@/types';
import MemosGrid from './MemosGrid';
import { useState } from 'react';
import { getMemos } from '@/service/memos';
import { OrderBy, Period } from '@/types/enum';
import CategoryBtn from '../shared/CategoryBtn';

type Props = {
  memos: Memo[];
};

export default function MemosContainer({ memos }: Props) {
  const [memoData, setMemodata] = useState(memos);
  const [selectedOrderType, setSelectedOrderType] = useState(OrderBy.Hot);

  const handleClick = async (orderBy: OrderBy) => {
    const memos = await getMemos(Period.Month, orderBy);
    setMemodata(memos);
    setSelectedOrderType(orderBy);
  };

  return (
    <div>
      <div className="flex gap-2 mb-5">
        <CategoryBtn
          text="Hot🔥"
          onClick={() => handleClick(OrderBy.Hot)}
          isSelected={selectedOrderType === OrderBy.Hot}
        />
        <CategoryBtn
          text="New✨"
          onClick={() => handleClick(OrderBy.New)}
          isSelected={selectedOrderType === OrderBy.New}
        />
      </div>
      <MemosGrid memos={memoData} colNum={4} />
    </div>
  );
}
