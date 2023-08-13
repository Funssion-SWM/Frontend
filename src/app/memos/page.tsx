import MemosGrid from '@/components/memo/MemosGrid';
import Header from '@/components/shared/Header';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { getMemos } from '@/service/memos';

export default async function MemosPage() {
  const memos = await getMemos();

  return (
    <section>
      <Header />
      <LayoutWrapper paddingY="sm:py-5">
        <MemosGrid memos={memos} colNum={4} />
      </LayoutWrapper>
    </section>
  );
}
