'use client';

import Link from 'next/link';
import { useState } from 'react';
import TypeIt from 'typeit-react';

export default function LandingPage() {
  const [state, setState] = useState(false);
  return (
    <div className="flex flex-col justify-center items-center h-screen px-3">
      <h1 className="text-4xl sm:text-7xl font-bold text-center overflow-hidden">
        <TypeIt
          options={{
            strings: [''],
            speed: 70,
            waitUntilVisible: true,
            afterComplete: () => {
              setState(true);
            },
          }}
        >
          개발 기록을 쉽고 즐겁게, 인포럼
        </TypeIt>
      </h1>
      <div
        className={`text-center transition-opacity ${
          state ? 'opacity-100' : 'opacity-0 invisible'
        } transform ${
          state ? 'translate-y-0' : 'translate-y-10'
        } duration-1000 ease-in-out`}
      >
        <p className="text-sm sm:text-2xl my-7 text-center">
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
    </div>
  );
}
