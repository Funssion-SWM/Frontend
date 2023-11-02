import Link from 'next/link';

export default function MiniIterviewDoneContainer() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-10">
      <div className="flex flex-col text-center gap-3">
        <p className="text-3xl sm:text-4xl font-semibold">수고하셨습니다.</p>
        <p className="text-3xl sm:text-4xl font-semibold">
          미니 면접이 모두 끝났습니다.
        </p>
      </div>

      <Link
        href="/series"
        className="bg-soma-blue-40 text-white px-4 py-2 text-xl sm:text-2xl rounded-2xl hover:brightness-90 transition-all"
      >
        메인 페이지로
      </Link>
    </div>
  );
}
