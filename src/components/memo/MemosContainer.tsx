'use client';

import { Memo } from '@/types/memo';
import { Orderby } from '@/types/common';
import MemosGrid from './MemosGrid';
import { getMemos } from '@/service/memos';
import CategoryLink from '../shared/CategoryLink';
import { useInfinityScroll } from '@/hooks/useInfinityScroll';

type Props = {
  memos: Memo[];
  type: Orderby;
};

export default function MemosContainer({ memos, type }: Props) {
  const [data, isEnd, setTarget] = useInfinityScroll(memos, (pageNum) =>
    getMemos('month', type, pageNum)
  );

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
      <MemosGrid memos={data} colNum={4} />
      {isEnd ? <></> : <div ref={setTarget} />}
    </div>
  );
}
