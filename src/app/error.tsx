'use client'; // Error components must be Client Components

import { MAIN_PATH } from '@/utils/const';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center">
      <h3 className="font-bold text-5xl">앗! 오류가 있네요. 죄송해요.</h3>
      <h3 className="font-bold text-5xl mt-4">
        지속적으로 발생하면 관리자에게 문의하세요.
      </h3>
      <button
        className="bg-soma-blue-40 w-72 h-16 shadow-2xl text-white px-3.5 py-2 rounded-3xl transition hover:bg-soma-blue-50 sm:text-2xl mt-10"
        onClick={() => {
          router.push(MAIN_PATH);
          router.refresh();
        }}
      >
        돌아가기
      </button>
    </div>
  );
}
