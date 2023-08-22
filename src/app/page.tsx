'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import TypeIt from 'typeit-react';
import landing from '@/assets/landing.gif';
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from 'react-icons/bs';
export default function LandingPage() {
  const [readyState, setReadyState] = useState(false);
  const firstScreenRef = useRef<null | HTMLDivElement>(null);

  const scrolltoTop = () => {
    if (firstScreenRef.current) {
      firstScreenRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="snap-y snap-mandatory overflow-y-scroll h-screen ">
      <div
        className="flex relative flex-col justify-center items-center h-full snap-always snap-center "
        ref={firstScreenRef}
      >
        <h1 className="text-4xl sm:text-7xl font-bold text-center overflow-hidden">
          <TypeIt
            options={{
              strings: [''],
              speed: 70,
              waitUntilVisible: true,
              afterComplete: () => {
                setReadyState(true);
              },
            }}
          >
            개발 기록을 쉽고 즐겁게, 인포럼
          </TypeIt>
        </h1>
        <div
          className={`text-center transition-opacity ${
            readyState ? 'opacity-100' : 'opacity-0 invisible'
          }  duration-1000 ease-in-out`}
        >
          <p className="text-sm sm:text-2xl my-7 text-center ">
            자동 텍스트 생성 기능을 통해 글을 쉽고 빠르게 작성하세요
            <br />
            파스텔톤 메모에 개발 기록을 간단하게 작성해보세요
          </p>
          <Link href="/memos">
            <button className="bg-soma-blue-40 text-white px-3.5 py-2 rounded-3xl transition hover:bg-soma-blue-50 sm:text-2xl">
              시작하기
            </button>
          </Link>
        </div>
        <BsFillArrowDownCircleFill
          className={`absolute bottom-10 animate-bounce text-soma-blue-40 w-10 h-10 transition-opacity bg-white rounded-full
        ${
          readyState ? 'opacity-100' : 'opacity-0 invisible'
        } duration-1000 ease-in-out duration`}
        />
      </div>
      <div className="flex flex-col items-center justify-center h-full font-semibold snap-always snap-center ">
        <p className="sm:text-2xl ">
          질문을 작성 후 ++를 입력해 text를 자동 생성해보세요!
        </p>
        <br />
        <Image
          src={landing}
          alt="landing"
          width={1000}
          className="rounded-2xl p-2"
        />
      </div>
      <div className="h-full relative flex flex-col items-center justify-center snap-always snap-center">
        <p className="text-lg sm:text-2xl font-semibold">지원 예정</p>
        <br />
        <ul className="grid grid-cols-2  gap-20 items-center sm:text-lg">
          <li className="flex justify-center items-center w-32 h-32 sm:w-48 sm:h-48 bg-red-100 rounded-full font-semibold">
            story 기능
          </li>
          <li className="flex justify-center items-center  w-32 h-32 sm:w-48 sm:h-48 bg-blue-100 rounded-full font-semibold">
            질문 서비스
          </li>
          <li className="flex justify-center items-center  w-32 h-32 sm:w-48 sm:h-48 bg-green-100 rounded-full font-semibold">
            등급 제도
          </li>
          <li className="flex justify-center items-center  w-32 h-32 sm:w-48 sm:h-48 bg-orange-100 rounded-full font-semibold text-center">
            사용자 log 기반 <br />
            나만의 포트폴리오
          </li>
        </ul>
        <button onClick={scrolltoTop}>
          <BsFillArrowUpCircleFill
            className={`absolute bottom-10 right-10 text-soma-blue-40 w-10 h-10`}
          />
        </button>
      </div>
    </div>
  );
}
