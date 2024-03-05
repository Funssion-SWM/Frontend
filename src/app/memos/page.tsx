import MemosContainer from '@/components/memo/MemosContainer';
import { getMemos } from '@/service/memos';
import { MEMO_NUMBER_PER_PAGE_FOR_INFINITY_SCROLL } from '@/constants/limit';

export default async function MemosPage() {
  const memos = await getMemos(
    'month',
    'new',
    0,
    MEMO_NUMBER_PER_PAGE_FOR_INFINITY_SCROLL
  );

  return <MemosContainer memos={memos} type="new" />;
}
