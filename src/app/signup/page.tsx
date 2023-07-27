import SignupForm from '@/components/SignupForm';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <section className="flex flex-col w-full items-center max-w-screen-sm mx-auto mt-5 shadow-lg py-5 px-32">
      <h1 className="text-3xl font-bold mb-5">Inforum</h1>
      <Link href="/login" className="self-end my-2 font-semibold">
        로그인
      </Link>
      <SignupForm />
    </section>
  );
}
