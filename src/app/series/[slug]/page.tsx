import SeriesDetailContainer from '@/components/series/SeriesDetailContainer';
import Header from '@/components/shared/Header';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { checkUser, getUserInfo } from '@/service/auth';
import { getCommentsByPostTypeAndPostId } from '@/service/comments';
import { getIsLike } from '@/service/like';
import { getMemoById, getMemoRecommendationsById } from '@/service/memos';
import { getNotificationsTop30 } from '@/service/notification';
import { getQuestionsByMemoId } from '@/service/questions';
import { getSeriesById } from '@/service/series';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/utils/const';
import { cookies } from 'next/headers';

type Props = {
  params: {
    slug: string;
  };
};

export default async function SeriesDetailPage({ params: { slug } }: Props) {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value;
  const refreshToken = cookies().get(REFRESH_TOKEN)?.value;
  const cookie = `${ACCESS_TOKEN}=${accessToken}; ${REFRESH_TOKEN}=${refreshToken}`;
  const seriesId = Number(slug);

  const { memoInfoList, likes, title } = await getSeriesById(seriesId);

  const memoData = getMemoById(memoInfoList[0].id, cookie);
  const likeData = getIsLike('series', seriesId, cookie);
  const commentData = getCommentsByPostTypeAndPostId(
    'memo',
    memoInfoList[0].id,
    cookie
  );
  const myData = checkUser(cookie);
  const questionsData = getQuestionsByMemoId(memoInfoList[0].id);
  const recommendationsData = getMemoRecommendationsById(memoInfoList[0].id);

  const [
    memo,
    { isLike },
    comments,
    { id, isLogin, authority },
    questions,
    recommendation,
  ] = await Promise.all([
    memoData,
    likeData,
    commentData,
    myData,
    questionsData,
    recommendationsData,
  ]);

  const { isFollowed, followCnt, followerCnt } = await getUserInfo(
    memo.authorId,
    cookie
  );

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
        currentPage="series"
        authority={authority}
      />
      <LayoutWrapper paddingY="sm:py-5">
        <SeriesDetailContainer
          memo={memo}
          comments={comments}
          questions={questions}
          recommendation={recommendation}
          isLike={isLike}
          userId={id}
          isLogin={isLogin}
          isFollowed={isFollowed}
          authorFollowingNum={followCnt}
          authorFollowerNum={followerCnt}
          memoInfoList={memoInfoList}
          seriesLikeNum={likes}
          seriesId={seriesId}
          isMySeries={id === memo.authorId}
          seriesTitle={title}
        />
      </LayoutWrapper>
    </section>
  );
}

export async function generateMetadata({ params: { slug } }: Props) {
  const seriesId = Number(slug);
  const { title, description } = await getSeriesById(seriesId);

  return {
    title: title,
    description: description.slice(0, 160),
  };
}
