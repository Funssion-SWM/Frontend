import EditorForm from '@/components/EditorForm';
import { getMemoById } from '@/service/memos';

type Props = {
  params: {
    slug: number;
  };
};

export default async function CreateMemoPage({ params: { slug } }: Props) {
  const { memoTitle, memoColor, memoText } = await getMemoById(slug)
    .then((res) => {
      if (!res.ok) throw new Error('error');
      return res.json();
    })
    .catch(console.error);

  return (
    <EditorForm
      preTitle={memoTitle}
      preContent={JSON.parse(memoText)}
      preColor={memoColor}
      isFirst={false}
      memoId={slug}
    />
  );
}
