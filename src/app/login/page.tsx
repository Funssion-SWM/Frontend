import GoogleLoginBtn from '@/components/login/GoogleLoginBtn';
import LoginForm from '@/components/login/LoginForm';
import { Metadata } from 'next';
import Link from 'next/link';
import logo from '@/assets/inforum_logo.png';
import Image from 'next/image';

export const metadata: Metadata = {
  title: '로그인',
  description: '로그인을 하는 곳입니다.',
};

export default function LoginPage() {
  return (
    <section className="relative flex flex-col w-full items-center max-w-screen-sm mx-auto mt-40 py-5 px-10 sm:px-32">
      <Link
        href="/memos"
        className="absolute top-2 right-4 text-soma-grey-50 text-sm sm:text-base"
      >
        메인으로
      </Link>
      <Image src={logo} alt="logo" width={200} />
      <LoginForm />
      <GoogleLoginBtn />
      <div className="flex items-center mt-7">
        <p className="text-soma-grey-50 mr-3 text-xs sm:text-sm">
          계정이 없으신가요?
        </p>
        <Link
          href="/signup"
          className="self-end my-2 font-semibold text-soma-blue-50 text-sm sm:text-base"
        >
          회원가입하기
        </Link>
      </div>
    </section>
  );
}
