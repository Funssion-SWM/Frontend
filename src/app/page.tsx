import Header from '@/components/shared/Header';
import MemosGrid from '@/components/memo/MemosGrid';
import { getMemos } from '@/service/memos';

export default async function HomePage() {
  const memos = await getMemos();

  return (
    <section>
      <Header />
      <MemosGrid memos={memos} colNum={4} />
    </section>
  );
}
