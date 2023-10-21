import RankingContainer from '@/components/ranking/RankingContainer';
import Header from '@/components/shared/Header';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { checkUser, getUserInfo } from '@/service/auth';
import { getNotificationsTop30 } from '@/service/notification';
import { getRankingByUserId, getTop10Ranking } from '@/service/rank';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/utils/const';
import { cookies } from 'next/headers';

export default async function RankingPage() {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value;
  const refreshToken = cookies().get(REFRESH_TOKEN)?.value;
  const cookie = `${ACCESS_TOKEN}=${accessToken}; ${REFRESH_TOKEN}=${refreshToken}`;

  const top10RankingData = getTop10Ranking();
  const myData = checkUser(cookie);
  const [top10Ranking, { id, isLogin }] = await Promise.all([
    top10RankingData,
    myData,
  ]);

  const myRanking = id === -1 ? null : await getRankingByUserId(id);

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
      />
      <LayoutWrapper paddingY="sm:py-5">
        <RankingContainer
          top10Ranking={top10Ranking}
          myId={id}
          myRanking={myRanking}
        />
      </LayoutWrapper>
    </section>
  );
}
