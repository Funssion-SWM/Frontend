import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/header/Header';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Q&A - 인포럼',
  description: '인포럼 Q&A 페이지입니다.',
  keywords: ['inforum', '인포럼', 'question', 'answer', '질문', '답변', 'q&a'],
};

export default async function QuestionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Header currentPage="questions" />
      <LayoutWrapper paddingY="sm:py-5">{children}</LayoutWrapper>
      <Footer />
    </section>
  );
}
