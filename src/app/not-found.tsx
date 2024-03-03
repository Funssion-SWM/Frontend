import Image from 'next/image';
import image404 from '@/assets/image404.png';
import Link from 'next/link';
import { MAIN_PATH } from '@/constants/general';

export default function NotFoundPage() {
  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center">
      <Image src={image404} alt="image404" />
      <h3 className="font-bold text-5xl">페이지를 찾지 못했습니다!</h3>
      <Link
        href={MAIN_PATH}
        className="flex justify-center items-center font-medium bg-soma-blue-40 w-72 h-16 shadow-2xl text-white px-3.5 py-2 rounded-3xl transition hover:bg-soma-blue-50 sm:text-2xl mt-10"
      >
        홈으로 가기
      </Link>
    </div>
  );
}
