import Header from '@/components/shared/Header';
import MemoViewer from '@/components/memo/MemoViewer';
import { getMemoById } from '@/service/memos';
import LayoutWrapper from '@/components/shared/LayoutWrapper';

type Props = {
  params: {
    slug: number;
  };
};

export default async function MemoPage({ params: { slug } }: Props) {
  const { memoTitle, memoColor, memoText, authorId } = await getMemoById(slug);

  return (
    <section>
      <Header />
      <LayoutWrapper paddingY="py-5" bgColor="bg-soma-grey-10">
        <MemoViewer
          title={memoTitle}
          content={JSON.parse(memoText)}
          color={memoColor}
          memoId={slug}
          authorId={authorId}
        />
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
