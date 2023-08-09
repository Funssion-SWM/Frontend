import MyInfoForm from '@/components/MyInfoForm';
import Link from 'next/link';

export default function SignupSetting() {
  return (
    <section className="flex flex-col w-full items-center max-w-screen-sm mx-auto mt-24 shadow-lg py-5 px-32">
      <h1 className="text-3xl font-bold my-5">Inforum</h1>
      <MyInfoForm />
    </section>
  );
}
