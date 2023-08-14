import '@/styles/globals.css';
import '@/styles/prosemirror.css';
import Providers from './providers';
import { pretendard } from '@/styles/fonts';
import ModalProvider from '@/context/ModalProvider';
import Modal from '@/components/Modal';
import GoogleAnalytics from '@/components/GoogleAnalytics';

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
        <ModalProvider>
          <Providers>{children}</Providers>
          <Modal />
        </ModalProvider>
      </body>
    </html>
  );
}
