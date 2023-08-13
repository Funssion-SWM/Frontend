import SignupForm from '@/components/SignupForm';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '회원가입',
  description: '회원가입을 하는 곳입니다.',
};

export default function SignupPage() {
  return (
    <section className="relative flex flex-col w-full items-center max-w-screen-sm mx-auto mt-12 py-5 px-10 sm:px-32">
      <Link
        href="/"
        className="absolute top-2 right-4 text-soma-grey-50 text-sm sm:text-base"
      >
        메인으로
      </Link>
      <h1 className="text-3xl font-bold my-5">Inforum</h1>
      <SignupForm />
      <div className="flex items-center">
        <p className="text-soma-grey-50 mr-3 text-xs sm:text-sm">
          계정이 이미 있나요?
        </p>
        <Link
          href="/login"
          className="self-end my-2 font-semibold text-soma-blue-50 text-sm sm:text-base"
        >
          로그인하기
        </Link>
      </div>
    </section>
  );
}
