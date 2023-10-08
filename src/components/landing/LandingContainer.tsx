'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import TypeIt from 'typeit-react';
import landing from '@/assets/landing.gif';
import editing from '@/assets/edit-memo.gif';
import logo from '@/assets/inforum_logo.png';
import editUnderline from '@/assets/icons/edit_underline.svg';
import speechBubble from '@/assets/icons/speech_bubble.svg';
import Footer from '@/components/shared/Footer';
import down from '@/assets/icons/down.svg';

export default function LandingContainer() {
  const [readyState, setReadyState] = useState(false);
  const firstScreenRef = useRef<null | HTMLDivElement>(null);

  return (
    <div className="snap-y snap-mandatory overflow-y-scroll h-screen">
      <div
        className="flex relative flex-col justify-center items-center h-full sm:snap-always sm:snap-center  bg-gradient-to-t from-soma-blue-30 from-0% via-white via-80%"
        ref={firstScreenRef}
      >
        <Image src={logo} width={300} alt="logo" />
        <h1 className="text-4xl sm:text-5xl mt-5 font-bold text-center overflow-hidden">
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
            개발 기록을 쉽고 즐겁게
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
            블럭 기반 에디터를 활용해 개발 기록을 간편하게 작성해보세요
          </p>
          <Link href="/memos">
            <button className="bg-soma-blue-40 w-72 h-16 shadow-2xl text-white px-3.5 py-2 rounded-3xl transition hover:bg-soma-blue-50 sm:text-2xl">
              시작하기
            </button>
          </Link>
        </div>
        <Image
          src={down}
          alt="down"
          className={`absolute bottom-10 animate-bounce transition-opacity rounded-full
        ${
          readyState ? 'opacity-100' : 'opacity-0 invisible'
        } duration-1000 ease-in-out duration`}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center h-full font-semibold sm:snap-always sm:snap-center ">
        <Image
          src={landing}
          alt="landing"
          width={600}
          className="rounded-2xl"
        />
        <div className="sm:ml-14 w-full sm:w-auto px-4">
          <Image
            src={speechBubble}
            alt="speech-bubble"
            className="w-[30px] sm:w-9 mt-5"
          />
          <p className="text-2xl sm:text-4xl font-bold leading-tight mb-5">
            Gen AI를 활용한
            <br />
            텍스트 자동 생성 기능
          </p>
          <p className="text-sm sm:text-xl font-normal">
            작성 중 ++를 입력해 텍스트를 자동 생성해보세요!
            <br />
            검색보다 빠르고 간편하게 정보를 제공합니다.
          </p>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row items-center justify-center h-full font-semibold sm:snap-always sm:snap-center ">
        <div className="sm:mr-14 w-full sm:w-auto px-4">
          <Image
            src={editUnderline}
            alt="edit-underline"
            className="w-[30px] sm:w-9 mt-5"
          />
          <p className="text-2xl sm:text-4xl font-bold leading-tight mb-5">
            블럭 기반 에디터를 활용한
            <br />
            간편한 에디팅 기능
          </p>
          <p className="text-sm sm:text-xl font-normal">
            바로 반영되는 마크다운을 사용해보세요!
            <br />/ 키와 드래그를 이용하여 다양한 편집 기능을 사용해보세요!
          </p>
        </div>
        <Image
          src={editing}
          alt="landing"
          width={600}
          className="rounded-2xl"
        />
      </div>

      <div className="flex relative flex-col items-center justify-center h-full font-semibold sm:snap-always sm:snap-center bg-[#F6F8FC]">
        <p className="text-4xl sm:text-5xl w-80 sm:w-auto font-bold text-center leading-snug sm:leading-snug mb-16">
          인포럼과 함께
          <br />
          토론하며 성장하는
          <br />
          긍정적인 개발공간을 만들어보세요.
        </p>
        <Link href="/memos">
          <button className="bg-soma-blue-40 w-72 h-16 shadow-2xl text-white px-3.5 py-2 rounded-3xl transition hover:bg-soma-blue-50 sm:text-2xl">
            시작하기
          </button>
        </Link>
      </div>

      <Footer extraClass="w-full sm:snap-always sm:snap-end bg-white" />

      {/* <div className="h-full relative flex flex-col items-center justify-center snap-always snap-center bg-[#F6F8FC]">
        <p className="text-lg sm:text-2xl font-semibold">지원 예정</p>
        <br />
        <ul className="grid grid-cols-4  gap-20 items-center sm:text-lg mb-28">
          <li className="flex justify-center items-center w-32 h-32 sm:w-48 sm:h-48 bg-red-100 rounded-full font-semibold">
            series 기능
          </li>
          <li className="flex justify-center items-center  w-32 h-32 sm:w-48 sm:h-48 bg-blue-100 rounded-full font-semibold">
            스마트 드래그 기능
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
            className={`absolute bottom-10 right-10 text-soma-blue-40 w-10 h-10` }
          />
        </button>
      </div> */}
    </div>
  );
}
