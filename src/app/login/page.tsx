import GoogleLoginBtn from '@/components/login/GoogleLoginBtn';
import LoginForm from '@/components/login/LoginForm';
import { Metadata } from 'next';
import Link from 'next/link';
import logo from '@/assets/images/inforum_logo.png';
import Image from 'next/image';
import { ACCESS_TOKEN, MAIN_PATH } from '@/constants/general';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: '로그인',
  description: '로그인을 하는 곳입니다.',
};

export default function LoginPage() {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value;

  if (accessToken !== undefined) redirect(MAIN_PATH);

  return (
    <section className="relative flex flex-col items-center w-full max-w-screen-sm px-10 py-5 mx-auto mt-32 sm:px-32">
      <Link
        href={MAIN_PATH}
        className="absolute text-sm top-2 right-4 text-soma-grey-50 sm:text-base"
      >
        메인으로
      </Link>
      <Image src={logo} alt="logo" width={200} className="my-5" />
      <LoginForm />
      <GoogleLoginBtn />
      <div className="flex flex-col items-center mt-7">
        <div className="flex items-center ">
          <p className="mr-3 text-xs text-soma-grey-50 sm:text-sm">
            계정이 없으신가요?
          </p>
          <Link
            href="/signup?login-type=user"
            className="self-end text-sm font-semibold text-soma-blue-50 sm:text-base"
          >
            회원가입하기
          </Link>
        </div>
        <div className="flex items-center mb-3">
          <p className="mr-3 text-xs text-soma-grey-50 sm:text-sm">
            채용 서비스를 이용하러 오셨나요?
          </p>
          <Link
            href="/signup?login-type=employeer"
            className="self-end my-2 text-sm font-semibold text-soma-blue-50 sm:text-base"
          >
            시작하기
          </Link>
        </div>
        <div className="flex gap-2 text-xs text-soma-grey-50 sm:text-sm">
          <Link href="/find/email">이메일 찾기</Link>
          <p>|</p>
          <Link href="/find/password">비밀번호 변경</Link>
        </div>
      </div>
    </section>
  );
}
