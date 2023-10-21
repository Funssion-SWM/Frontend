'use client';

import { Memo } from '@/types/memo';
import { Orderby } from '@/types';
import MemosGrid from './MemosGrid';
import { useEffect, useRef, useState } from 'react';
import { getMemos } from '@/service/memos';
import CategoryBtn from '@/components/shared/btn/CategoryBtn';
import useObserver from '@/hooks/useObserver';
import { MEMO_NUMBER_PER_PAGE_FOR_INFINITY_SCROLL } from '@/utils/const';

type Props = {
  memos: Memo[];
};

export default function MemosContainer({ memos }: Props) {
  const [memoData, setMemodata] = useState<Memo[]>(memos);
  const [selectedOrderType, setSelectedOrderType] = useState<Orderby>('new');
  const [pageNum, setPageNum] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isInitialMount = useRef(true);

  const handleClick = async (orderBy: Orderby) => {
    setIsLoading(true);
    setIsEnd(false);
    setPageNum(0);
    const memos = await getMemos(
      'month',
      orderBy,
      0,
      MEMO_NUMBER_PER_PAGE_FOR_INFINITY_SCROLL
    );
    setIsLoading(false);
    setMemodata(memos);
    setSelectedOrderType(orderBy);
  };

  const fetchMemos = () => {
    if (isLoading || isEnd) return;
    setIsLoading(true);
    getMemos(
      'month',
      selectedOrderType,
      pageNum,
      MEMO_NUMBER_PER_PAGE_FOR_INFINITY_SCROLL
    )
      .then((data) => {
        setIsLoading(false);
        if (!data.length) setIsEnd(true);
        else {
          setMemodata([...memoData, ...data]);
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      fetchMemos();
    }
  }, [pageNum]);

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    if (isEnd || isLoading) return;
    entry.isIntersecting && setPageNum(pageNum + 1);
  };

  const { setTarget } = useObserver({ onIntersect });

  return (
    <div>
      <div className="flex gap-2 mb-3">
        <CategoryBtn
          text="New"
          size="big"
          onClick={() => handleClick('new')}
          isSelected={selectedOrderType === 'new'}
        />
        <CategoryBtn
          text="Hot"
          size="big"
          onClick={() => handleClick('hot')}
          isSelected={selectedOrderType === 'hot'}
        />
      </div>
      <MemosGrid memos={memoData} colNum={4} />
      {isEnd ? <></> : <div ref={setTarget} />}
    </div>
  );
}
