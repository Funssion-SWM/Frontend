import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { Metadata } from 'next';
import Header from '@/components/shared/header/Header';

export const metadata: Metadata = {
  title: 'Memos - 인포럼',
  description: '인포럼 Memos 페이지입니다.',
  keywords: ['inforum', '인포럼', 'memo', '메모', '블로그', 'blog'],
};

export default async function MemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Header currentPage="memos" />
      <LayoutWrapper paddingY="sm:py-5">{children}</LayoutWrapper>
    </section>
  );
}
