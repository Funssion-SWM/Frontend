"use client";

import closeIcon from '@/assets/icons/icon_close.svg';
import searchIcon from '@/assets/icons/icon_search_32.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, FormHTMLAttributes, useRef, useState } from 'react';

type Props = {
  extraClass:string,
};

export default function SearchForm( { extraClass }:Props ) {

  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [borderColor, setBorderColor] = useState("blue-400");

  const handleClick = () => {
    if (formRef.current) {
        formRef.current.submit();
    }
  }

  return (
    <section className={`flex flex-col max-w-screen-md m-auto ${extraClass}`}>
      <div className='self-end my-7'>
        <Image className='cursor-pointer' src={closeIcon} alt="close_icon" onClick={() => router.back()}/>
      </div>

      <form className={`bg-[#F8F9FB] border-${borderColor} my-2 rounded-3xl border-2 h-14 align-middle flex ease-in duration-200`} action='/search'>
        <Image className='cursor-pointer ml-8' src={searchIcon} alt="search_icon" onClick={handleClick}/>

        <input
          type='text'
          autoFocus
          className='text-lg focus:outline-none bg-transparent mx-4 w-full'
          name='q'
          onFocus={() => setBorderColor("blue-400")}
          onBlur={() => setBorderColor("")}
          placeholder='검색어를 입력해주세요.'
        />
      </form>

      <div className='mt-10'>
        <div className='font-normal text-lg'>
          최근 검색
        </div>
        <div>

        </div>
      </div>
    </section>
  )
}