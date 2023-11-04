import SearchContainer from '@/components/search/SearchContainer';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { checkUser, getUserInfo } from '@/service/auth';
import { getNotificationsTop30 } from '@/service/notification';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/utils/const';
import { cookies } from 'next/headers';

export default async function SearchPage() {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value;
  const refreshToken = cookies().get(REFRESH_TOKEN)?.value;
  const cookie = `${ACCESS_TOKEN}=${accessToken}; ${REFRESH_TOKEN}=${refreshToken}`;

  const myData = checkUser(cookie);

  const [{ id, isLogin, authority }] = await Promise.all([myData]);

  const { profileImageFilePath } = isLogin
    ? await getUserInfo(id)
    : { profileImageFilePath: undefined };

  const notifications = isLogin ? await getNotificationsTop30(cookie) : [];

  return (
    <section>
      <Header
        isLogin={isLogin}
        notifications={notifications}
        profileImageFilePath={profileImageFilePath}
        authority={authority}
      />
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
