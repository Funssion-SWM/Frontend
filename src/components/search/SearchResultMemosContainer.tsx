'use client';

import { Memo } from '@/types/memo';
import { Orderby } from '@/types';
import { useEffect, useState } from 'react';
import { searchMemos } from '@/service/memos';
import CategoryBtn from '@/components/shared/btn/CategoryBtn';
import MemosGrid from '../memo/MemosGrid';
import { useDebounce } from '@/hooks/useDebounce';
import { SEARCH_RESULT_TIME } from '@/utils/const';

type Props = {
  searchString: string;
  isTag: boolean;
  userId: string;
};

export default function SearchResultMemosContainer({
  searchString,
  isTag,
  userId,
}: Props) {
  const [memoData, setMemodata] = useState<Memo[]>([]);
  const [selectedOrderType, setSelectedOrderType] = useState<Orderby>('hot');

  const handleClick = async (orderBy: Orderby) => {
    const memos = await searchMemos(searchString, orderBy, isTag, userId);
    setMemodata(memos);
    setSelectedOrderType(orderBy);
  };

  const tempSearchString = useDebounce(searchString, SEARCH_RESULT_TIME);

  const init = async () => {
    const memos = await searchMemos(
      tempSearchString,
      selectedOrderType,
      isTag,
      userId
    );
    setMemodata(memos);
  };

  useEffect(() => {
    init();
  }, [tempSearchString]);

  return (
    <div>
      <div className="flex gap-2 ml-1">
        <CategoryBtn
          text="Hot"
          onClick={() => handleClick('hot')}
          size="big"
          isSelected={selectedOrderType === 'hot'}
        />
        <CategoryBtn
          text="New"
          onClick={() => handleClick('new')}
          size="big"
          isSelected={selectedOrderType === 'new'}
        />
      </div>
      <div className="my-4 font-medium ml-2">
        <span className="text-soma-blue-40">{memoData.length}개</span>의 검색
        결과가 있습니다.
      </div>
      <MemosGrid memos={memoData} colNum={4} />
    </div>
  );
}
