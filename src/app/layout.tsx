import '@/styles/globals.css';
import '@/styles/prosemirror.css';
import { Inter } from 'next/font/google';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

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
    <html lang="en" className={inter.className}>
      <body className="flex flex-col w-full max-w-screen-xl mx-auto px-10">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
