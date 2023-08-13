import Link from 'next/link';

export default function Footer() {
  return (
    <div className="bg-soma-grey-20">
      <footer className="flex flex-col items-center py-5 px-5 max-w-screen-xl m-auto text-soma-grey-70">
        <p className="font-semibold my-2 text-lg">Contact</p>
        <p>✉️ dongwoo0307@naver.com</p>
        <Link
          href="https://open.kakao.com/o/gbdqT3Af"
          className="text-soma-blue-50"
        >
          💬 카카오톡 오픈 채팅방
        </Link>
      </footer>
    </div>
  );
}
