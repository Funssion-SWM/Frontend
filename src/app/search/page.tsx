import SearchForm from "@/components/search/SearchForm";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
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
        <section className="max-w-screen-md m-auto py-5">
          <SearchForm />
        </section>

        <LayoutWrapper paddingY="sm:py-5">
        </LayoutWrapper>
      <Footer />
    </section>
      
  )
}