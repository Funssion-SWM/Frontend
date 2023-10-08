import SignupForm from '@/components/signup/SignupForm';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/inforum_logo.png';

export const metadata: Metadata = {
  title: '회원가입',
  description: '회원가입을 하는 곳입니다.',
};

export default function SignupPage() {
  return (
    <section className="relative flex flex-col w-full items-center max-w-screen-sm mx-auto mt-12 py-5 px-10 sm:px-32">
      <Link
        href="/memos"
        className="absolute top-2 right-4 text-soma-grey-50 text-sm sm:text-base"
      >
        메인으로
      </Link>
      <Image src={logo} alt="logo" width={200} className="my-5" />
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
