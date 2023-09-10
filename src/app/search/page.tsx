import SearchContainer from "@/components/search/SearchContainer";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { checkUser, getUserInfo } from "@/service/auth";
import { ACCESS_TOKEN } from "@/utils/const";
import { cookies } from "next/headers";

export default async function SearchPage() {
  const cookie = cookies().get(ACCESS_TOKEN)?.value;
  
  const { id, isLogin } = await checkUser(cookie);
  const { profileImageFilePath } = isLogin
    ? await getUserInfo(id)
    : { profileImageFilePath: undefined };

  return (
    <section>
      <Header isLogin={isLogin} profileImageFilePath={profileImageFilePath}/>
      <SearchContainer />
      <Footer />
    </section>
      
  )
}