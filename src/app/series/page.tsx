import SeriesContainer from '@/components/series/SeriesContainer';
import Header from '@/components/shared/Header';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { checkUser, getUserInfo } from '@/service/auth';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/utils/const';
import { cookies } from 'next/headers';

export default async function SeriesPage() {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value;
  const refreshToken = cookies().get(REFRESH_TOKEN)?.value;
  const cookie = `${ACCESS_TOKEN}=${accessToken}; ${REFRESH_TOKEN}=${refreshToken}`;

  // const seriesData = getSeries()
  const myData = checkUser(cookie);
  const [{ id, isLogin }] = await Promise.all([myData]);

  const { profileImageFilePath } = isLogin
    ? await getUserInfo(id)
    : { profileImageFilePath: undefined };

  return (
    <section>
      <Header
        isLogin={isLogin}
        profileImageFilePath={profileImageFilePath}
        currentPage="memos"
      />
      <LayoutWrapper paddingY="sm:py-5">
        <SeriesContainer />
      </LayoutWrapper>
    </section>
  );
}
