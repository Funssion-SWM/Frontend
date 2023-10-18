import Header from '@/components/shared/Header';
import MemoViewer from '@/components/memo/MemoViewer';
import { getMemoById } from '@/service/memos';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import MemoSideBar from '@/components/memo/MemoSideBar';
import { getCommentsByPostTypeAndPostId } from '@/service/comments';
import { cookies } from 'next/headers';
import { getIsLike } from '@/service/like';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/utils/const';
import { checkUser, getUserInfo } from '@/service/auth';
import { getQuestionsByMemoId } from '@/service/questions';

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

  const memoData = getMemoById(memoId, cookie);
  const likeData = getIsLike('memos', memoId, cookie);
  const commentData = getCommentsByPostTypeAndPostId('memo', memoId, cookie);
  const myData = checkUser(cookie);
  const questionsData = getQuestionsByMemoId(memoId);

  const [
    {
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
    },
    { isLike },
    comments,
    { id, isLogin },
    questions,
  ] = await Promise.all([
    memoData,
    likeData,
    commentData,
    myData,
    questionsData,
  ]);

  const { isFollowed, followCnt, followerCnt } = await getUserInfo(
    authorId,
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
          />
          <MemoSideBar
            authorName={authorName}
            authorProfileImagePath={authorProfileImagePath}
            authorId={authorId}
            comments={comments}
            questions={questions}
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
      </LayoutWrapper>
    </section>
  );
}

export async function generateMetadata({ params: { slug } }: Props) {
  const memoId = Number(slug);
  const { memoTitle, memoDescription } = await getMemoById(memoId);

  return {
    title: memoTitle,
    description: memoDescription.slice(0, 160),
  };
}
