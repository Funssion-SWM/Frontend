'use client';

import { useInfinityScroll } from '@/hooks/useInfinityScroll';
import MemosGrid from '../memo/MemosGrid';
import { Memo } from '@/types/memo';
import { getLikedMemosByUserId, getMemosByUserId } from '@/service/me';

type Props = {
  memos: Memo[];
  userId: number;
  bigCategory: 'post' | 'like';
};

export default function MeMemosContainer({
  memos,
  userId,
  bigCategory,
}: Props) {
  const [data, isEnd, setTarget] = useInfinityScroll(memos, (pageNum) =>
    bigCategory === 'post'
      ? getMemosByUserId(userId, pageNum)
      : getLikedMemosByUserId(userId, pageNum)
  );

  return (
    <>
      <MemosGrid memos={data} colNum={3} />
      {isEnd ? <></> : <div ref={setTarget} />}
    </>
  );
}
