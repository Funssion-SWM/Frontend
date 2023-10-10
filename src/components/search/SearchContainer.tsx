'use client';

import { ChangeEvent, useState } from 'react';
import SearchForm from './SearchForm';
import { useSearchParams } from 'next/navigation';
import SearchResultContainer from './SearchResultContainer';

type Props = {
  isLogin: boolean;
};

export default function SearchContainer({ isLogin }: Props) {
  const searchParams = useSearchParams();

  const [searchString, setSearchString] = useState(
    searchParams?.get('q') ?? ''
  );
  const userId = searchParams?.get('userId') ?? '0';
  const isTag = (searchParams?.get('isTag') ?? 'false') === 'true';

  return (
    <>
      <section className="max-w-screen-md m-auto py-5 px-3">
        <SearchForm
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setSearchString(e.target.value);
          }}
          isLogin={isLogin}
        />
      </section>
      <SearchResultContainer
        searchString={searchString}
        isTag={isTag}
        userId={userId}
      />
    </>
  );
}
