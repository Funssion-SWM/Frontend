"use client"

import Image from 'next/image';
import searchIcon from '@/assets/icons/icon_search_32.svg';
import React, { ChangeEvent, useRef, useState } from 'react';
import { addSearchHistory } from '@/service/search';
import { useSearchParams } from "next/navigation";

type Props = {
  onChange?:(e:ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchForm( { onChange }:Props ) {
  const searchParams = useSearchParams();
  const [searchString, setSearchString] = useState(searchParams?.get("q") ?? "");
  const isTag = (searchParams?.get("isTag") ?? "false") == "true";

  const formRef = useRef<HTMLFormElement | null>(null); 
  const [borderColor, setBorderColor] = useState("border-blue-400");

  const handleClick = () => {
    if (formRef.current && !isTag) {
      formRef.current.requestSubmit();
    }
  }

  const handleChange = onChange ? onChange : (e:ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  }

  const handleSubmit = () => {
    if (isTag) return;
    addSearchHistory(searchString, false);
  }

    return (
      <form 
        ref={formRef} 
        className={`bg-[#F8F9FB] border-2  ${borderColor} my-2 rounded-3xl h-14 align-middle flex ease-in duration-200`} 
        action='/search'
        onSubmit={handleSubmit}
      >
        <Image className={`${isTag ? "" : "cursor-pointer"} ml-8`} src={searchIcon} alt="search_icon" onClick={handleClick}/>

        <input
          type='text'
          autoFocus
          className={`text-lg focus:outline-none bg-transparent mx-4 w-full ${isTag ? "text-green-500" : ""}`}
          name='q'
          onFocus={(e) => {
            e.target.selectionStart = e.target.value.length;
            setBorderColor("border-blue-400");
          }}
          onBlur={() => setBorderColor("")}
          onChange={handleChange}
          placeholder='검색어를 입력해주세요.'
          defaultValue={isTag ? "# " + searchString : searchString}
          disabled={isTag}
        />
      </form>
    )
}