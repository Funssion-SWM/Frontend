'use client';

import { Memo } from '@/types/memo';
import { Orderby } from '@/types';
import MemosGrid from './MemosGrid';
import { useEffect, useRef, useState } from 'react';
import { getMemos } from '@/service/memos';
import useObserver from '@/hooks/useObserver';
import { MEMO_NUMBER_PER_PAGE_FOR_INFINITY_SCROLL } from '@/utils/const';
import CategoryLink from '../shared/CategoryLink';

type Props = {
  memos: Memo[];
  type: Orderby;
};

export default function MemosContainer({ memos, type }: Props) {
  const [memoData, setMemodata] = useState<Memo[]>(memos);
  const [pageNum, setPageNum] = useState(1);
  const [isEnd, setIsEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isInitialMount = useRef(true);

  const fetchMemos = () => {
    if (isLoading || isEnd) return;
    setIsLoading(true);
    getMemos('month', type, pageNum, MEMO_NUMBER_PER_PAGE_FOR_INFINITY_SCROLL)
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
        <CategoryLink
          text="New"
          href="/memos/new"
          size="big"
          isSelected={type === 'new'}
        />
        <CategoryLink
          text="Hot"
          href="/memos/hot"
          size="big"
          isSelected={type === 'hot'}
        />
      </div>
      <MemosGrid memos={memoData} colNum={4} />
      {isEnd ? <></> : <div ref={setTarget} />}
    </div>
  );
}
