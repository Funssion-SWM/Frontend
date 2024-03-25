import '@/styles/globals.css';
import '@/styles/prosemirror.css';
import Providers from './providers';
import { pretendard } from '@/styles/fonts';
import ModalProvider from '@/context/ModalProvider';
import Modal from '@/components/shared/Modal';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import ToastProvider from '@/context/ToastProvider';
import CreationModalProvider from '@/context/CreationModalProvider';
import CreationModal from '@/components/shared/CreationModal';
import FallingContainer from '@/components/falling/FallingContainer';

export const metadata = {
  title: '인포럼 - 무한한 개발 이야기 공간',
  description:
    '개발 기록을 쉽고, 즐겁게! 생성형 AI를 활용한 자동 텍스트 생성 기능을 통해 글을 쉽고 빠르게 작성하세요. 블럭 기반 에디터를 활용해 개발 기록을 간편하게 작성해보세요. 메모들을 모아 자신만의 시리즈를 만들어보세요.',
  keywords: [
    'inforun',
    '인포럼',
    'memos',
    '메모',
    '개발',
    '개발블로그',
    '질문답변',
    '개발질문',
    '시리즈',
    '무한',
    'infinity',
    '생성형 AI',
    'Gen AI',
    'Generative AI',
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={pretendard.className}>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <GoogleAnalytics />
      <body className="flex flex-col">
        <ToastProvider>
          <CreationModalProvider>
            <ModalProvider>
              <Providers>{children}</Providers>
              <Modal />
            </ModalProvider>
            <CreationModal />
          </CreationModalProvider>
        </ToastProvider>
        <FallingContainer />
      </body>
    </html>
  );
}
