"use client";

import MemosContainer from "@/components/memo/MemosContainer";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import { searchMemos } from "@/service/memos"
import { Memo } from "@/types/memo";
import { data } from "autoprefixer";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const searchString = searchParams?.get("q");
  const [memos, setMemos] = useState<Memo[]>([]);

  const first = () => {
    if (searchString) {
      searchMemos(searchString, "hot", true, false).then((data) => {
        console.log(data);
        setMemos(data);
      });
    }
  }

  useEffect(() => {
    first();
  }, [])

  return (
    <section>
      <Header />
        <LayoutWrapper paddingY="sm:py-5">
          <MemosContainer memos={memos} />
        </LayoutWrapper>
      <Footer />
    </section>
      
  )
}