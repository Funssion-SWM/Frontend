import SearchContainer from '@/components/search/SearchContainer';
import Header from '@/components/shared/header/Header';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { checkUser } from '@/service/auth';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/general';
import { cookies } from 'next/headers';

export default async function SearchPage() {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value;
  const refreshToken = cookies().get(REFRESH_TOKEN)?.value;
  const cookie = `${ACCESS_TOKEN}=${accessToken}; ${REFRESH_TOKEN}=${refreshToken}`;

  const { isLogin } = await checkUser(cookie);

  return (
    <section>
      <Header />
      <LayoutWrapper paddingY="sm:py-5">
        <SearchContainer isLogin={isLogin} />
      </LayoutWrapper>
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
