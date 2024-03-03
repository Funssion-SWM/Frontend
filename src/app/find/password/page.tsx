import Image from 'next/image';
import logo from '@/assets/images/inforum_logo.png';
import FindPasswordForm from '@/components/find/FindPasswordForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '인포럼 - Find Password',
  description: '인포럼 Find Password 페이지입니다.',
};

export default function FindPasswordPage() {
  return (
    <section className="flex flex-col items-center justify-center w-full h-screen max-w-screen-sm px-10 mx-auto sm:px-32">
      <div className="flex flex-col items-center w-full mb-32">
        <Image src={logo} alt="logo" width={200} className="mt-24" />
        <div className="w-full mt-10 mb-3">
          <h3 className="text-lg font-semibold sm:text-2xl">
            비밀번호를 잊어버리셨나요?
          </h3>
          <p className="text-sm sm:text-base">
            Inforum에서 사용하는 이메일을 입력해주세요.
          </p>
        </div>
        <FindPasswordForm />
      </div>
    </section>
  );
}
