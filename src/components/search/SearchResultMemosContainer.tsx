'use client';

import { Memo } from '@/types/memo';
import { Orderby } from '@/types';
import { useEffect, useState } from 'react';
import { searchMemos } from '@/service/memos';
import CategoryBtn from '@/components/shared/btn/CategoryBtn';
import MemosGrid from '../memo/MemosGrid';
import { useDebounce } from '@/hooks/useDebounce';
// import CategoryBtn from '../shared/btn/CategoryBtn';

type Props = {
  searchString: string;
  isTag: boolean;
};

export default function SearchResultMemosContainer({
  searchString,
  isTag,
}: Props) {
  const [memoData, setMemodata] = useState<Memo[]>([]);
  const [selectedOrderType, setSelectedOrderType] = useState<Orderby>('hot');

  const handleClick = async (orderBy: Orderby) => {
    const memos = await searchMemos(searchString, orderBy, isTag);
    setMemodata(memos);
    setSelectedOrderType(orderBy);
  };

  const tempSearchString = useDebounce(searchString, 1000);

  const init = async () => {
    const memos = await searchMemos(tempSearchString, selectedOrderType, isTag);
    setMemodata(memos);
  };

  useEffect(() => {
    init();
  }, [tempSearchString]);

  return (
    <div>
      <div className="flex gap-2 mb-5">
        <CategoryBtn
          text="Hot🔥"
          onClick={() => handleClick('hot')}
          isSelected={selectedOrderType === 'hot'}
        />
        <CategoryBtn
          text="New✨"
          onClick={() => handleClick('new')}
          isSelected={selectedOrderType === 'new'}
        />
      </div>
      <div className="pb-2">{memoData.length} 개의 검색 결과가 있습니다.</div>
      <MemosGrid memos={memoData} colNum={4} />
    </div>
  );
}
