import MemoViewer from '@/components/memo/MemoViewer';
import { getMemoById, getMemoRecommendationsById } from '@/service/memos';
import MemoSideBar from '@/components/memo/MemoSideBar';
import { getCommentsByPostTypeAndPostId } from '@/service/comments';
import { cookies } from 'next/headers';
import { getIsLike } from '@/service/like';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/general';
import { checkUser, getUserInfo } from '@/service/auth';
import { getQuestionsByMemoId } from '@/service/questions';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    slug: string;
  };
};

export default async function MemoPage({ params: { slug } }: Props) {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value;
  const refreshToken = cookies().get(REFRESH_TOKEN)?.value;
  const cookie = `${ACCESS_TOKEN}=${accessToken}; ${REFRESH_TOKEN}=${refreshToken}`;
  const memoId = Number(slug);

  const {
    memoTitle,
    memoColor,
    memoText,
    authorId,
    likes,
    authorName,
    authorProfileImagePath,
    memoTags,
    isMine,
    createdDate,
    seriesId,
    seriesTitle,
    authorRank,
  } = await getMemoById(memoId, cookie);

  if (memoTitle === undefined) {
    notFound();
  }

  const likeData = getIsLike('memos', memoId, cookie);
  const commentData = getCommentsByPostTypeAndPostId('memo', memoId, cookie);
  const myData = checkUser(cookie);
  const questionsData = getQuestionsByMemoId(memoId);
  const recommendationsData = getMemoRecommendationsById(memoId);

  const [{ isLike }, comments, { id, isLogin }, recommendations, questions] =
    await Promise.all([
      likeData,
      commentData,
      myData,
      recommendationsData,
      questionsData,
    ]);

  const { isFollowed, followCnt, followerCnt } = await getUserInfo(
    authorId,
    cookie
  );

  return (
    <div className="flex w-full ">
      <MemoViewer
        title={memoTitle}
        content={JSON.parse(memoText)}
        color={memoColor}
        memoTags={memoTags}
        memoId={memoId}
        likes={likes}
        isLike={isLike}
        isMyMemo={isMine}
        createdDate={createdDate}
        seriesId={seriesId}
        seriesTitle={seriesTitle}
        isLogin={isLogin}
      />
      <MemoSideBar
        authorName={authorName}
        authorProfileImagePath={authorProfileImagePath}
        authorId={authorId}
        comments={comments}
        questions={questions}
        recommendations={recommendations}
        memoId={memoId}
        userId={id}
        isFollowed={isFollowed}
        isMyMemo={isMine}
        isLogin={isLogin}
        authorFollowingNum={followCnt}
        authorFollowerNum={followerCnt}
        authorRank={authorRank}
      />
    </div>
  );
}

export async function generateMetadata({ params: { slug } }: Props) {
  const memoId = Number(slug);
  const { memoTitle, memoDescription } = await getMemoById(memoId);
  if (memoTitle === undefined) {
    notFound();
  }

  return {
    title: memoTitle,
    description: memoDescription.slice(0, 160),
  };
}
