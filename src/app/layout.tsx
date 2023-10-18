import '@/styles/globals.css';
import '@/styles/prosemirror.css';
import Providers from './providers';
import { pretendard } from '@/styles/fonts';
import ModalProvider from '@/context/ModalProvider';
import Modal from '@/components/shared/Modal';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import ToastProvider from '@/components/ToastProvider';
import CreationModalProvider from '@/context/CreationModalProvider';
import CreationModal from '@/components/shared/CreationModal';

export const metadata = {
  title: 'Inforum',
  description: '개발 기록을 쉽고, 즐겁게',
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
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={pretendard.className}>
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
      </body>
    </html>
  );
}
