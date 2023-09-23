import { findEmail } from '@/service/auth';
import Link from 'next/link';

type Props = {
  params: {
    slug: string;
  };
};

export default async function FindEmailResultpage({ params: { slug } }: Props) {
  const result = await findEmail(slug);

  return (
    <section className="flex flex-col items-center h-screen justify-center">
      <p className="font-semibold text-2xl">{result.message}</p>
      <p className="font-bold text-4xl my-5">{result.email && result.email}</p>
      <Link href="/login" className="font-bold text-soma-blue-40 text-lg">
        로그인 하러가기
      </Link>
    </section>
  );
}
