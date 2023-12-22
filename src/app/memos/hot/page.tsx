import MemosContainer from '@/components/memo/MemosContainer';
import { getMemos } from '@/service/memos';
import { MEMO_NUMBER_PER_PAGE_FOR_INFINITY_SCROLL } from '@/utils/const';

export default async function MemosHotPage() {
  const memos = await getMemos(
    'month',
    'hot',
    0,
    MEMO_NUMBER_PER_PAGE_FOR_INFINITY_SCROLL
  );

  return <MemosContainer memos={memos} type="hot" />;
}
