import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/inforum_logo.png';
import kakao from '@/assets/icons/kakao.svg';

type Props = {
  extraClass?: string;
};

export default function Footer({ extraClass }: Props) {
  return (
    <footer className={`bg-soma-grey-25 py-10 ${extraClass}`}>
      <div className="flex flex-col sm:flex-row items-center px-4 sm:max-w-screen-xl m-auto text-soma-grey-70 text-xs sm:text-sm">
        <div className="flex flex-col w-full sm:w-auto">
          <div className="flex items-center">
            <Image
              src={logo}
              alt="logo"
              width={110}
              className="mr-7 sm:mb-0 sm:inline-block"
            />
            <div className="flex gap-5">
              <Link href="/agreement" className="font-bold">
                이용약관
              </Link>
              <Link href="/privacy-policy" className="font-bold">
                개인정보 처리 방침
              </Link>
            </div>
          </div>
          <div className="mt-5 sm:mt-10">
            <span className="font-bold mr-2">Add.</span>
            <span>서울특별시 강남구 테헤란로 311 SW마에스트로 연수센터</span>
          </div>
          <div className="mt-5 sm:mt-3">
            <span className="font-bold mr-2">Channel.</span>
            <a
              href="http://pf.kakao.com/_WxdeCG"
              target="_blank"
              rel="noopener noreferrer"
              className="text-soma-blue-50"
            >
              카카오톡 채널
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:ml-20 w-full sm:w-auto">
          <div className="mt-5 sm:mt-20">
            <span className="font-bold mr-2">Mail.</span>
            <span>dongwoo0307@naver.com</span>
          </div>
          <div className="mt-5 sm:mt-3">
            <span className="font-bold mr-2">Form.</span>
            <a
              href="https://forms.gle/KSUMNMhubdPmTMxk8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-soma-blue-50"
            >
              문의하기
            </a>
          </div>
        </div>

        <div className="hidden sm:block mt-20 ml-auto">
          <a
            href="http://pf.kakao.com/_WxdeCG"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={kakao} alt="kakao" width={24} />
          </a>
        </div>
      </div>
      <p className="text-sm sm:text-base mt-5 sm:mt-10 px-4 text-[#888] max-w-screen-xl sm:mx-auto font-normal w-72 sm:w-auto mr-auto">
        Copyright © 2023 SWM Funssion() Team All rights reserved.
      </p>
    </footer>
  );
}
