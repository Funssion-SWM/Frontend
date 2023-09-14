"use client"

import { ChangeEvent, useEffect, useState } from "react";
import LayoutWrapper from "../shared/LayoutWrapper";
import SearchForm from "./SearchForm";
import { useSearchParams } from "next/navigation";
import SearchResultMemosContainer from "./SearchResultMemosContainer";

export default function SearchContainer() {
  const searchParams = useSearchParams();
  const [searchString, setSearchString] = useState(searchParams?.get('q') ?? "");
  const isTag = (searchParams?.get('isTag') ?? "false") == "true";
 
  return (
    <>
      <section className="max-w-screen-md m-auto py-5">
        <SearchForm 
          onChange={(e:ChangeEvent<HTMLInputElement>) => {
            setSearchString(e.target.value);
          }}
        />
      </section>

      <LayoutWrapper paddingY="sm:py-5">
        <SearchResultMemosContainer searchString={searchString} isTag={isTag} />
      </LayoutWrapper>
    </>
  )
}