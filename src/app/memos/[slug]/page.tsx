import Header from '@/components/shared/Header';
import MemoViewer from '@/components/memo/MemoViewer';
import { getMemoById } from '@/service/memos';

type Props = {
  params: {
    slug: number;
  };
};

export default async function MemoPage({ params: { slug } }: Props) {
  const { memoTitle, memoColor, memoText, authorId } = await getMemoById(slug);

  return (
    <>
      <Header />
      <MemoViewer
        title={memoTitle}
        content={JSON.parse(memoText)}
        color={memoColor}
        memoId={slug}
        authorId={authorId}
      />
    </>
  );
}

export async function generateMetadata({ params }: Props) {
  const { memoTitle } = await getMemoById(params.slug);

  return {
    title: memoTitle,
  };
}
