import SeriesContainer from '@/components/series/SeriesContainer';
import Header from '@/components/shared/Header';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { checkUser, getUserInfo } from '@/service/auth';
import { getSeriesArray } from '@/service/series';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/utils/const';
import { cookies } from 'next/headers';

export default async function SeriesPage() {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value;
  const refreshToken = cookies().get(REFRESH_TOKEN)?.value;
  const cookie = `${ACCESS_TOKEN}=${accessToken}; ${REFRESH_TOKEN}=${refreshToken}`;

  const seriesData = getSeriesArray('month', 'new');
  const myData = checkUser(cookie);
  let [seriesArray, { id, isLogin }] = await Promise.all([seriesData, myData]);

  if ('code' in seriesArray) {
    seriesArray = [];
    console.error('Error when get seriesArr');
  }

  const { profileImageFilePath } = isLogin
    ? await getUserInfo(id)
    : { profileImageFilePath: undefined };

  return (
    <section>
      <Header
        isLogin={isLogin}
        profileImageFilePath={profileImageFilePath}
        currentPage="series"
      />
      <LayoutWrapper paddingY="sm:py-5">
        <SeriesContainer seriesArray={seriesArray} />
      </LayoutWrapper>
    </section>
  );
}
