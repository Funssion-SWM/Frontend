import Header from '@/components/shared/Header';
import '@/styles/globals.css';
import '@/styles/prosemirror.css';
import { Inter } from 'next/font/google';
import Providers from './providers';
import { checkUser } from '@/service/auth';

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
  // const { id, isLogin } = await checkUser()
  //   .then((res) => {
  //     if (!res.ok) throw new Error('error!!');
  //     return res.json();
  //   })
  //   .catch(console.error);

  return (
    <html lang="en" className={inter.className}>
      <body className="flex flex-col w-full max-w-screen-xl mx-auto px-10">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
