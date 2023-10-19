import Image from 'next/image';
import logo from '@/assets/inforum_logo.png';
import FindEmailForm from '@/components/find/FindEmailForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inforum - Find Email',
  description: 'Inforum Find Email 페이지입니다.',
};

export default function FindEmailPage() {
  return (
    <section className="flex flex-col w-full h-screen justify-center items-center mx-auto max-w-screen-sm px-10 sm:px-32">
      <div className="flex flex-col mb-32 items-center w-full">
        <Image src={logo} alt="logo" width={200} className="mt-24" />
        <div className="w-full mt-10 mb-3">
          <h3 className="font-semibold text-lg sm:text-2xl">
            이메일을 잊어버리셨나요?
          </h3>
          <p className="text-sm sm:text-base">
            Inforum에서 사용하는 닉네임을 입력해주세요.
          </p>
        </div>
        <FindEmailForm />
      </div>
    </section>
  );
}
