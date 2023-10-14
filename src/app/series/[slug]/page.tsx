import SeriesDetailContainer from '@/components/series/SeriesDetailContainer';
import Header from '@/components/shared/Header';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { checkUser, getUserInfo } from '@/service/auth';
import { getCommentsByPostTypeAndPostId } from '@/service/comments';
import { getIsLike } from '@/service/like';
import { getMemoById } from '@/service/memos';
import { getQuestionsByMemoId } from '@/service/questions';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/utils/const';
import { cookies } from 'next/headers';

type Props = {
  params: {
    slug: string;
  };
};

const memoIds = [387, 388, 389, 390];

export default async function SeriesDetailPage({ params: { slug } }: Props) {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value;
  const refreshToken = cookies().get(REFRESH_TOKEN)?.value;
  const cookie = `${ACCESS_TOKEN}=${accessToken}; ${REFRESH_TOKEN}=${refreshToken}`;
  const seriesId = Number(slug);

  const memoData = getMemoById(memoIds[0], cookie);
  const likeData = getIsLike('memos', memoIds[0], cookie);
  const commentData = getCommentsByPostTypeAndPostId(
    'memo',
    memoIds[0],
    cookie
  );
  const myData = checkUser(cookie);
  const questionsData = getQuestionsByMemoId(memoIds[0]);

  const [memo, { isLike }, comments, { id, isLogin }, questions] =
    await Promise.all([memoData, likeData, commentData, myData, questionsData]);

  const { isFollowed, followCnt, followerCnt } = await getUserInfo(
    memo.authorId,
    cookie
  );

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
        <SeriesDetailContainer
          memo={memo}
          comments={comments}
          questions={questions}
          isLike={isLike}
          userId={id}
          isLogin={isLogin}
          isFollowed={isFollowed}
          authorFollowingNum={followCnt}
          authorFollowerNum={followerCnt}
          memoIds={memoIds}
        />
      </LayoutWrapper>
    </section>
  );
}
