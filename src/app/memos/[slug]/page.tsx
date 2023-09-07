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
  const {
    memoTitle,
    memoColor,
    memoText,
    authorId,
    likes,
    authorName,
    authorProfileImagePath,
    isMine,
  } = await getMemoById(slug, cookies().get(ACCESS_TOKEN)?.value);

  const { isLike } = await getIsLike(
    'memos',
    slug,
    cookies().get(ACCESS_TOKEN)?.value
  );

  const comments = await getCommentsByPostTypeAndPostId(
    'memo',
    slug,
    cookies().get(ACCESS_TOKEN)?.value
  );

  const { id, isLogin } = await checkUser(cookies().get(ACCESS_TOKEN)?.value);
  const userInfo = id !== -1 ? await getUserInfo(id) : undefined;

  return (
    <section>
      <Header
        isLogin={isLogin}
        profileImageFilePath={userInfo?.profileImageFilePath}
      />
      <LayoutWrapper paddingY="sm:py-5" bgColor="bg-soma-grey-10">
        <div className="flex w-full ">
          <MemoViewer
            title={memoTitle}
            content={JSON.parse(memoText)}
            color={memoColor}
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
          />
        </div>
      </LayoutWrapper>
    </section>
  );
}

export async function generateMetadata({ params }: Props) {
  const { memoTitle } = await getMemoById(params.slug);

  return {
    title: memoTitle,
  };
}
