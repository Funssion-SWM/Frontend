import MemosContainer from '@/components/memo/MemosContainer';
import { getMemos } from '@/service/memos';

export default async function MemosNewPage() {
  const memos = await getMemos('month', 'new');

  return <MemosContainer memos={memos} type="new" />;
}
