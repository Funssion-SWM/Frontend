import SearchContainer from '@/components/search/SearchContainer';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { checkUser, getUserInfo } from '@/service/auth';
import { ACCESS_TOKEN } from '@/utils/const';
import { cookies } from 'next/headers';

export default async function SearchPage() {
  const cookie = cookies().get(ACCESS_TOKEN)?.value;

  const { id, isLogin } = await checkUser(cookie);
  const { profileImageFilePath } = isLogin
    ? await getUserInfo(id)
    : { profileImageFilePath: undefined };

  return (
    <section>
      <Header isLogin={isLogin} profileImageFilePath={profileImageFilePath} />
      <LayoutWrapper paddingY="sm:py-5">
        <SearchContainer />
      </LayoutWrapper>
      <Footer />
    </section>
  );
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return {
    title: `"${searchParams['q']}" - 검색 결과`,
    description: `"${searchParams['q']}"의 검색 결과입니다.`,
  };
}
