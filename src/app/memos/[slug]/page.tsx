import Header from '@/components/shared/Header';
import MemoViewer from '@/components/memo/MemoViewer';
import { getMemoById } from '@/service/memos';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import MemoSideBar from '@/components/memo/MemoSideBar';
import { getCommentsByPostTypeAndPostId } from '@/service/comments';
import { cookies } from 'next/headers';
import { getIsLike } from '@/service/like';
import { ACCESS_TOKEN } from '@/utils/const';
import { checkUser, getUserInfo } from '@/service/auth';

type Props = {
  params: {
    slug: number;
  };
};

export default async function MemoPage({ params: { slug } }: Props) {
  const cookie = cookies().get(ACCESS_TOKEN)?.value;

  const memoData = getMemoById(slug, cookie);
  const likeData = getIsLike('memos', slug, cookie);
  const commentData = getCommentsByPostTypeAndPostId('memo', slug, cookie);
  const myData = checkUser(cookie);

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
    },
    { isLike },
    comments,
    { id, isLogin },
  ] = await Promise.all([memoData, likeData, commentData, myData]);

  const { profileImageFilePath } = isLogin
    ? await getUserInfo(id)
    : { profileImageFilePath: undefined };

  return (
    <section>
      <Header isLogin={isLogin} profileImageFilePath={profileImageFilePath} />
      <LayoutWrapper paddingY="sm:py-5" bgColor="bg-soma-grey-20">
        <div className="flex w-full ">
          <MemoViewer
            title={memoTitle}
            content={JSON.parse(memoText)}
            color={memoColor}
            memoTags={memoTags}
            memoId={slug}
            likes={likes}
            isLike={isLike}
            isMyMemo={isMine}
          />
          <MemoSideBar
            authorName={authorName}
            authorProfileImagePath={authorProfileImagePath}
            authorId={authorId}
            comments={comments}
            memoId={slug}
            userId={id}
          />
        </div>
      </LayoutWrapper>
    </section>
  );
}

export async function generateMetadata({ params }: Props) {
  const { memoTitle, memoDescription } = await getMemoById(params.slug);

  return {
    title: memoTitle,
    description: memoDescription.slice(0, 160),
  };
}
