"use client"

import Image from 'next/image';
import searchIcon from '@/assets/icons/icon_search_32.svg';
import React, { useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SearchForm() {
  const searchParams = useSearchParams();
  const searchString = searchParams?.get("q");

  console.log(searchString);

  const formRef = useRef<HTMLFormElement | null>(null); 
  const [borderColor, setBorderColor] = useState("border-blue-400");

  const handleClick = () => {
    if (formRef.current) {
        formRef.current.submit();
    }
  }

    return (
      <form ref={formRef} className={`bg-[#F8F9FB] border-2  ${borderColor} my-2 rounded-3xl h-14 align-middle flex ease-in duration-200`} action='/search'>
        <Image className='cursor-pointer ml-8' src={searchIcon} alt="search_icon" onClick={handleClick}/>

        <input
          type='text'
          autoFocus
          className='text-lg focus:outline-none bg-transparent mx-4 w-full'
          name='q'
          onFocus={() => setBorderColor("border-blue-400")}
          onBlur={() => setBorderColor("")}
          placeholder='검색어를 입력해주세요.'
          value={searchString ? searchString : ""}
        />
      </form>
    )
}