import Link from 'next/link';
import Image from 'next/image';
import logo from '@/assets/inforum_logo.png';
import kakao from '@/assets/icons/kakao.svg';

type Props = {
  extraClass?: string;
}

export default function Footer({extraClass}:Props) {
  return (
    <div className={`${extraClass}`}>
      <footer className="flex flex-col sm:flex-row items-center pt-10 px-4 sm:max-w-screen-xl m-auto text-soma-grey-70 text-sm">
        <div className='flex flex-col w-full sm:w-auto'>
          <p>
            <Image src={logo} alt="logo" width={110} className='mr-7 mb-5 sm:mb-0 sm:inline-block'/>
            <span className='font-bold'>이용약관 및 개인정보처리방침</span>
          </p>
          <p className='mt-5 sm:mt-10'>
            <span className='font-bold mr-2'>Add.</span>
            <span>서울 특별시 강남구 테헤란로 311 SW 마에스트로 연수센터</span>
          </p>
          <p className='mt-5 sm:mt-3'>
            <span className='font-bold mr-2'>Tel.</span>
            <Link
              href="https://open.kakao.com/o/gbdqT3Af"
              className="text-soma-blue-50"
            >
              카카오톡 오픈 채팅방
            </Link>
          </p>
        </div>

        <div className='flex flex-col sm:ml-20 w-full sm:w-auto'>
          <p className='mt-5 sm:mt-20'>
            <span className='font-bold mr-2'>Mail.</span>
            <span>dongwoo0307@naver.com</span>
          </p>
          <p className='mt-5 sm:mt-3'>
            <span className='font-bold mr-2'>문의 구글폼</span>
            <span>?</span>
          </p>
        </div>

        <div className='hidden sm:block mt-20 ml-auto'>
          <Link
            href="https://open.kakao.com/o/gbdqT3Af"
            className="text-soma-blue-50"
          >
            <Image src={kakao} alt='kakao' width={24} />
          </Link>
        </div>
      </footer>
      <p className='text-base py-5 sm:my-10 px-4 text-[#888] max-w-screen-xl sm:mx-auto font-normal w-72 sm:w-auto mr-auto'>
        Copyright © 2023 SWM Funssion() Team All rights reserved.
      </p>
    </div>
  );
}
