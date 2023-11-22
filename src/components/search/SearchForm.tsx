'use client';

import Image from 'next/image';
import searchIcon from '@/assets/icons/icon_search_32.svg';
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { addSearchHistory } from '@/service/search';
import { useSearchParams } from 'next/navigation';

type Props = {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  isLogin: boolean;
};

export default function SearchForm({ onChange, isLogin }: Props) {
  const searchParams = useSearchParams();
  const [searchString, setSearchString] = useState(
    searchParams?.get('q') ?? ''
  );
  const isTag = (searchParams?.get('isTag') ?? 'false') == 'true';
  const userName = searchParams?.get('userName') ?? undefined;

  const formRef = useRef<HTMLFormElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [borderColor, setBorderColor] = useState('border-blue-400');

  const handleClick = () => {
    if (formRef.current && !isTag) {
      formRef.current.requestSubmit();
    }
  };

  const handleChange = onChange
    ? onChange
    : (e: ChangeEvent<HTMLInputElement>) => {
        setSearchString(e.target.value);
      };

  const handleSubmit = () => {
    if (isTag) return;
    isLogin && addSearchHistory(searchString, false);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.selectionStart = inputRef.current.value.length;
    }
  }, []);

  return (
    <form
      ref={formRef}
      className={`bg-[#F8F9FB] border-2  ${borderColor} my-2 rounded-3xl h-14 align-middle flex ease-in duration-200`}
      action="/search"
      onSubmit={handleSubmit}
      acceptCharset="utf8"
    >
      <Image
        className={`${isTag ? '' : 'cursor-pointer'} ml-8`}
        src={searchIcon}
        alt="search_icon"
        onClick={handleClick}
      />

      <input
        type="text"
        autoFocus
        ref={inputRef}
        className={`text-lg focus:outline-none bg-transparent mx-4 w-full ${
          isTag ? 'text-green-500' : ''
        }`}
        name="q"
        onFocus={(e) => {
          e.target.selectionStart = e.target.value.length;
          setBorderColor('border-blue-400');
        }}
        onBlur={() => setBorderColor('')}
        onChange={handleChange}
        placeholder="검색어를 입력해주세요."
        defaultValue={isTag ? '# ' + searchString : searchString}
        disabled={isTag}
      />
      {userName ? (
        <span className="text-sm whitespace-nowrap leading-[52px] mr-3 cursor-none text-gray-400">
          : {userName}
        </span>
      ) : (
        ''
      )}
    </form>
  );
}
