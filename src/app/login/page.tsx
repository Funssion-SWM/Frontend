import LoginForm from '@/components/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <section className="flex flex-col w-full items-center max-w-screen-sm mx-auto mt-24 shadow-lg py-10 px-32">
      <h1 className="text-3xl font-bold mb-10">SOMA</h1>
      <Link href="/signup" className="self-end my-2 font-semibold">
        회원가입
      </Link>
      <LoginForm />
    </section>
  );
}
