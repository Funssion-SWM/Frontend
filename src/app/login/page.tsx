import LoginForm from '@/components/LoginForm';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '로그인',
  description: '로그인을 하는 곳입니다.',
};

export default function LoginPage() {
  return (
    <section className="relative flex flex-col w-full items-center max-w-screen-sm mx-auto mt-44 shadow-lg py-5 px-32">
      <Link href="/" className="absolute top-2 right-4 text-soma-grey-50">
        메인으로
      </Link>
      <h1 className="text-3xl font-bold my-5">Inforum</h1>
      <Link href="/signup" className="self-end my-2 font-semibold">
        회원가입
      </Link>
      <LoginForm />
    </section>
  );
}
