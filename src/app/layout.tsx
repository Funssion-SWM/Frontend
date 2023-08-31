import '@/styles/globals.css';
import '@/styles/prosemirror.css';
import Providers from './providers';
import { pretendard } from '@/styles/fonts';
import ModalProvider from '@/context/ModalProvider';
import Modal from '@/components/shared/Modal';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import ToastProvider from '@/components/ToastProvider';

export const metadata = {
  title: 'Inforum',
  description: 'You can make a post easily',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={pretendard.className}>
      <GoogleAnalytics />
      <body className="flex flex-col">
        <ToastProvider>
          <ModalProvider>
            <Providers>{children}</Providers>
            <Modal />
          </ModalProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
