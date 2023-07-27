import SignupForm from '@/components/SignupForm';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '회원가입',
  description: '회원가입을 하는 곳입니다.',
};

export default function SignupPage() {
  return (
    <section className="relative flex flex-col w-full items-center max-w-screen-sm mx-auto mt-12 shadow-lg py-5 px-32">
      <Link href="/" className="absolute top-2 right-4 text-soma-grey-50">
        메인으로
      </Link>
      <h1 className="text-3xl font-bold my-5">Inforum</h1>
      <Link href="/login" className="self-end my-2 font-semibold">
        로그인
      </Link>
      <SignupForm />
    </section>
  );
}
