import Header from '@/components/shared/header/Header';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Series - 인포럼',
  description: '인포럼 Series 페이지입니다.',
  keywords: ['inforum', '인포럼', '시리즈', 'series', '블로그', 'blog'],
};

export default async function SeriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Header currentPage="series" />
      <LayoutWrapper paddingY="sm:py-5">{children}</LayoutWrapper>
    </section>
  );
}
