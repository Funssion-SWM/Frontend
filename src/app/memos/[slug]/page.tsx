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
  } = await getMemoById(slug, cookie);

  const { isLike } = await getIsLike('memos', slug, cookie);

  const comments = await getCommentsByPostTypeAndPostId('memo', slug, cookie);

  const { id, isLogin } = await checkUser(cookie);
  const { profileImageFilePath } = isLogin
    ? await getUserInfo(id)
    : { profileImageFilePath: undefined };

  return (
    <section>
      <Header isLogin={isLogin} profileImageFilePath={profileImageFilePath} />
      <LayoutWrapper paddingY="sm:py-5" bgColor="bg-soma-grey-10">
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
