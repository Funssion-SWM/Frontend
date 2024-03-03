'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MAIN_PATH } from '@/constants/general';
import { Down } from '@/assets/svg';

export default function MainDescription() {
  const [readyState, setReadyState] = useState(false);

  useEffect(() => {
    setReadyState(true);
  }, []);

  return (
    <div>
      <h1
        className={`mt-5 overflow-hidden text-4xl font-bold text-center sm:text-6xl ransition-opacity ${
          readyState ? 'opacity-100' : 'opacity-0 invisible'
        }  duration-500 ease-in-out`}
      >
        무한한 개발 이야기 공간
      </h1>
      <div
        className={`flex flex-col items-center transition-opacity ${
          readyState ? 'opacity-100' : 'opacity-0 invisible'
        }  duration-500 ease-in-out`}
      >
        <p className="text-sm text-center sm:text-2xl my-7 ">
          다양한 개발 컨텐츠를 쉽고 간편하게 만들어 보세요
          <br />
          인포럼과 함께 긍정적인 개발 생태계를 만들어봐요
        </p>
        <Link href={`${MAIN_PATH}`}>
          <div className="flex justify-center items-center bg-soma-blue-40 w-72 h-16 shadow-2xl text-white px-3.5 py-2 rounded-3xl transition hover:bg-soma-blue-50 sm:text-2xl">
            시작하기
          </div>
        </Link>
      </div>
      <Image
        src={Down}
        alt="down"
        className={`absolute m-auto left-0 right-0 bottom-10  animate-bounce transition-opacity rounded-full
        ${
          readyState ? 'opacity-100' : 'opacity-0 invisible'
        } duration-1000 ease-in-out `}
      />
    </div>
  );
}
