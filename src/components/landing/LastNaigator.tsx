'use client';

import { MAIN_PATH } from '@/constants/general';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LastNaigator() {
  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const element = ref.current;
      gsap.fromTo(
        element,
        { opacity: 0 },
        {
          scrollTrigger: {
            trigger: element,
            start: 'top center',
          },
          opacity: 1,
          duration: 1,
        }
      );
    }
  }, []);
  return (
    <div className="flex flex-col items-center justify-center font-semibold bg-[#F6F8FC] py-40">
      <div className="flex flex-col items-center" ref={ref}>
        <p className="mb-16 text-4xl font-bold leading-snug text-center sm:text-5xl w-80 sm:w-auto sm:leading-snug">
          인포럼과 함께
          <br />
          토론하며 성장하는
          <br />
          긍정적인 개발공간을 만들어보세요.
        </p>

        <Link href={`${MAIN_PATH}`}>
          <div className="flex justify-center items-center bg-soma-blue-40 w-72 h-16 shadow-2xl text-white px-3.5 py-2 rounded-3xl transition hover:bg-soma-blue-50 sm:text-2xl">
            시작하기
          </div>
        </Link>
      </div>
    </div>
  );
}
