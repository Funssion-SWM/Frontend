import EditorForm from '@/components/create/memo/EditorForm';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { getMemoById } from '@/service/memos';

type Props = {
  params: {
    slug: number;
  };
};

export default async function CreateMemoPage({ params: { slug } }: Props) {
  const { memoTitle, memoColor, memoText, memoTags } = await getMemoById(slug);

  return (
    <LayoutWrapper paddingY="sm:py-10" bgColor="bg-soma-grey-10">
      {/* <EditorForm
        preTitle={memoTitle}
        preContent={JSON.parse(memoText)}
        preColor={memoColor}
        preMemoTags={memoTags}
        alreadyExists={true}
        memoId={slug}
      /> */}
    </LayoutWrapper>
  );
}

export async function generateMetadata({ params }: Props) {
  const { memoTitle } = await getMemoById(params.slug);

  return {
    title: `(작성중) - ${memoTitle}`,
  };
}
