import Header from '@/components/shared/Header';
import {
  getHistory,
  getMemosByUserId,
  getRankInfoByUserId,
  getStatsByUserId,
} from '@/service/me';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { checkUser, getUserInfo } from '@/service/auth';
import MeMainContainer from '@/components/me/MeMainContainer';
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

type Props = {
  params: {
    slug: string;
  };
};

export default async function MePage({ params: { slug } }: Props) {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value;
  const refreshToken = cookies().get(REFRESH_TOKEN)?.value;
  const cookie = `${ACCESS_TOKEN}=${accessToken}; ${REFRESH_TOKEN}=${refreshToken}`;
  const userId = Number(slug);

  const memosData = getMemosByUserId(userId);
  const userData = getUserInfo(userId, cookie);
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

  const [
    memos,
    userInfo,
    history,
    { id, isLogin },
    tags,
    followings,
    followers,
    userRankInfo,
    userStats,
    { dailyScore },
  ] = await Promise.all([
    memosData,
    userData,
    historyData,
    myData,
    tagData,
    followingData,
    followerData,
    userRankData,
    userStatsData,
    userScoreData,
  ]);

  const myUserInfo = await getUserInfo(id);

  const notifications = isLogin ? await getNotificationsTop30(cookie) : [];

  return (
    <section>
      <Header
        isLogin={isLogin}
        notifications={notifications}
        profileImageFilePath={myUserInfo?.profileImageFilePath}
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
            <MeMainContainer memos={memos} userId={userId} />
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}

export async function generateMetadata({ params }: Props) {
  const userId = Number(params.slug);
  const { nickname } = await getUserInfo(userId);

  return {
    title: `${nickname} - 인포럼`,
    description: `${nickname}의 마이페이지입니다.`,
  };
}
