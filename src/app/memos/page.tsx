import MemosContainer from '@/components/memo/MemosContainer';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { getMemos } from '@/service/memos';

export default async function MemosPage() {
  const memos = await getMemos();

  return (
    <section>
      <Header />
      <LayoutWrapper paddingY="sm:py-5">
        <MemosContainer memos={memos} />
      </LayoutWrapper>
      <Footer />
    </section>
  );
}
