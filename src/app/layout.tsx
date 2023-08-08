import '@/styles/globals.css';
import '@/styles/prosemirror.css';
import Providers from './providers';
import { pretendard } from '@/styles/fonts';

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
      <body className="flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
