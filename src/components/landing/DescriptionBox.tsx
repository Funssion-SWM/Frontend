'use client';

import Image, { StaticImageData } from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
type Props = {
  title1: string;
  title2: string;
  description1: string;
  description2: string;
  subImg: string | StaticImageData;
  mainImg: string | StaticImageData;
  subImgAlt: string;
  mainImgAlt: string;
  reverse?: boolean;
};

gsap.registerPlugin(ScrollTrigger);

export default function DescriptionBox({
  title1,
  title2,
  description1,
  description2,
  subImg,
  mainImg,
  subImgAlt,
  mainImgAlt,
  reverse = false,
}: Props) {
  const ref = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const element = ref.current;
      gsap.fromTo(
        element,
        { opacity: 0, y: 400 },
        {
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
          },
          y: 0,
          opacity: 1,
          duration: 1,
        }
      );
    }
  }, []);

  return (
    <div
      className={`flex items-center justify-around h-full w-full font-semibold flex-col-reverse gap-8 md:gap-0 ${
        reverse ? 'md:flex-row-reverse' : 'md:flex-row'
      }`}
      ref={ref}
    >
      <Image
        src={mainImg}
        alt={mainImgAlt}
        className="object-cover rounded-2xl sm:w-[550px] w-[350px] shadow-lg"
      />
      <div className="px-4 sm:w-auto">
        <Image src={subImg} alt={subImgAlt} className="w-[30px] sm:w-9 mt-5" />
        <p className="mb-5 text-2xl font-bold leading-tight sm:text-4xl">
          {title1}
          <br />
          {title2}
        </p>
        <p className="text-sm font-normal sm:text-xl">
          {description1}
          <br />
          {description2}
        </p>
      </div>
    </div>
  );
}
