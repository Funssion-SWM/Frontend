import Header from '@/components/shared/Header';
import MemosGrid from '@/components/memo/MemosGrid';
import { getMemos } from '@/service/memos';
import LayoutWrapper from '@/components/shared/LayoutWrapper';

export default async function HomePage() {
  const memos = await getMemos();

  return (
    <section>
      <Header />
      <LayoutWrapper paddingY="py-5">
        <MemosGrid memos={memos} colNum={4} />
      </LayoutWrapper>
    </section>
  );
}
