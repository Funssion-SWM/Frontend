"use client";

import MemosContainer from "@/components/memo/MemosContainer";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import { checkUser, getUserInfo } from "@/service/auth";
import { searchMemos } from "@/service/memos"
import { Memo } from "@/types/memo";
import { ACCESS_TOKEN } from "@/utils/const";
import { cookies } from "next/headers";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default async function SearchPage() {
  const cookie = cookies().get(ACCESS_TOKEN)?.value;
  
  const searchParams = useSearchParams();
  const searchString = searchParams?.get("q");
  
  const { id, isLogin } = await checkUser(cookie);
  const { profileImageFilePath } = isLogin
    ? await getUserInfo(id)
    : { profileImageFilePath: undefined };

  const [memos, setMemos] = useState<Memo[]>([]);

  console.log(searchString);

  const first = () => {
    
    if (searchString) {
      searchMemos(searchString, "hot", true, false).then((data) => {
        setMemos(data);
      });
    }
  }

  useEffect(() => {
    first();
  }, [])

  return (
    <section>
      <Header isLogin={isLogin} profileImageFilePath={profileImageFilePath}/>
        <LayoutWrapper paddingY="sm:py-5">
          <MemosContainer memos={memos} />
        </LayoutWrapper>
      <Footer />
    </section>
      
  )
}