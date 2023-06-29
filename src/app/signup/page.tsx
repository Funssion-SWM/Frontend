import SignupForm from '@/components/SignupForm';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <section className="flex flex-col w-full items-center max-w-screen-sm mx-auto my-10">
      <h1 className="text-2xl font-bold">LOGO</h1>
      <Link href="/login" className="self-end my-2 font-bold">
        로그인
      </Link>
      <SignupForm />
    </section>
  );
}
