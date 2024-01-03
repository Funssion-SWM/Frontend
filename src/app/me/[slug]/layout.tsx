import Header from '@/components/shared/Header';
import {
  getHistory,
  getMemosByUserId,
  getRankInfoByUserId,
  getStatsByUserId,
} from '@/service/me';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { checkUser, getUserInfo } from '@/service/auth';
import { cookies } from 'next/headers';
import { ACCESS_TOKEN, MY_TAG_MAX_COUNT, REFRESH_TOKEN } from '@/utils/const';
import MeSideBar from '@/components/me/MeSideBar';
import { getUserTags } from '@/service/tag';
import MeTagsContainer from '@/components/me/MeTagsContainer';
import { getFollowers, getFollowings } from '@/service/follow';
import FollowListModalProvider from '@/context/FollowListModalProvider';
import FollowListModal from '@/components/me/FollowListModal';
import { getNotificationsTop30 } from '@/service/notification';
import { getScoreInfoByUserId } from '@/service/rank';
import {
  getCoverletterInfoByUserId,
  getCoverletterVisibleMode,
} from '@/service/coverletter';
import { notFound } from 'next/navigation';

type Props = {
  children: React.ReactNode;
  params: {
    slug: string;
  };
};

export default async function MeLayout({ children, params: { slug } }: Props) {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value;
  const refreshToken = cookies().get(REFRESH_TOKEN)?.value;
  const cookie = `${ACCESS_TOKEN}=${accessToken}; ${REFRESH_TOKEN}=${refreshToken}`;
  const userId = Number(slug);

  const userInfo = await getUserInfo(userId, cookie);
  if (userInfo.userId === undefined) {
    notFound();
  }

  const memosData = getMemosByUserId(userId);
  const historyData = getHistory(
    userId,
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    true
  );
  const myData = checkUser(cookie);
  const tagData = getUserTags(slug, MY_TAG_MAX_COUNT);
  const followingData = getFollowings(slug);
  const followerData = getFollowers(slug);
  const userRankData = getRankInfoByUserId(userId);
  const userStatsData = getStatsByUserId(userId);
  const userScoreData = getScoreInfoByUserId(userId);
  const coverletterVisibleModeData = getCoverletterVisibleMode();

  const [
    history,
    { id, isLogin, authority },
    tags,
    followings,
    followers,
    userRankInfo,
    userStats,
    { dailyScore },
    coverletterIsVisible,
  ] = await Promise.all([
    historyData,
    myData,
    tagData,
    followingData,
    followerData,
    userRankData,
    userStatsData,
    userScoreData,
    coverletterVisibleModeData,
  ]);

  const myUserInfo = await getUserInfo(id);

  const notifications = isLogin ? await getNotificationsTop30(cookie) : [];

  const isCoverletterCreated = await getCoverletterInfoByUserId(
    userId,
    cookie
  ).then((res) => {
    if ('code' in res) {
      return false;
    }
    return true;
  });

  return (
    <section>
      <Header
        isLogin={isLogin}
        notifications={notifications}
        profileImageFilePath={myUserInfo?.profileImageFilePath}
        authority={authority}
      />
      <LayoutWrapper paddingY="py-0">
        <div className="flex flex-col sm:flex-row">
          <FollowListModalProvider
            followings={followings}
            followers={followers}
          >
            <MeSideBar
              userInfo={userInfo}
              history={history}
              userId={userId}
              myId={id}
              myUserInfo={myUserInfo}
              userRankInfo={userRankInfo}
              userStats={userStats}
              dailyScore={dailyScore}
              isCoverletterCreated={isCoverletterCreated}
              coverletterIsVisible={coverletterIsVisible}
            />
            <FollowListModal isMine={id === userId} />
          </FollowListModalProvider>
          <div className="flex flex-col w-full">
            {tags.length >= 2 && (
              <MeTagsContainer
                tags={tags}
                userInfo={userInfo}
                userId={userId}
                isLogin={isLogin}
              />
            )}
            {children}
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
