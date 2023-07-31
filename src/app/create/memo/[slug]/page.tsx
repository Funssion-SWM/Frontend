import EditorForm from '@/components/EditorForm';
import { getMemoById } from '@/service/memos';

type Props = {
  params: {
    slug: number;
  };
};

export default async function CreateMemoPage({ params: { slug } }: Props) {
  const { memoTitle, memoColor, memoText } = await getMemoById(slug);

  return (
    <EditorForm
      preTitle={memoTitle}
      preContent={JSON.parse(memoText)}
      preColor={memoColor}
      alreadyExists={false}
      memoId={slug}
    />
  );
}

export async function generateMetadata({ params }: Props) {
  const { memoTitle } = await getMemoById(params.slug);

  return {
    title: `(수정중) - ${memoTitle}`,
  };
}
