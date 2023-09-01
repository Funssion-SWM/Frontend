import Header from '@/components/shared/Header';
import MemoViewer from '@/components/memo/MemoViewer';
import { getMemoById } from '@/service/memos';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import MemoSideBar from '@/components/memo/MemoSideBar';

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
  } = await getMemoById(slug);

  return (
    <section>
      <Header />
      <LayoutWrapper paddingY="sm:py-5" bgColor="bg-soma-grey-10">
        <div className="flex w-full ">
          <MemoViewer
            title={memoTitle}
            content={JSON.parse(memoText)}
            color={memoColor}
            memoId={slug}
            authorId={authorId}
            likes={likes}
          />
          <MemoSideBar
            authorName={authorName}
            authorProfileImagePath={authorProfileImagePath}
            authorId={authorId}
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
