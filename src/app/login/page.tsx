import LoginForm from '@/components/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <section className="flex flex-col w-full items-center max-w-screen-sm mx-auto">
      <h1 className="text-2xl font-bold">LOGO</h1>
      <Link href="/signup" className="self-end my-2 font-bold">
        회원가입
      </Link>
      <LoginForm />
    </section>
  );
}
