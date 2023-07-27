import MemoViewer from '@/components/MemoViewer';
import { getMemoById } from '@/service/memos';

type Props = {
  params: {
    slug: number;
  };
};

export async function generateMetadata({ params }: Props) {
  const { memoTitle } = await getMemoById(params.slug)
    .then((res) => {
      if (!res.ok) throw new Error('error');
      return res.json();
    })
    .catch(console.error);

  return {
    title: memoTitle,
  };
}

export default async function MemoPage({ params: { slug } }: Props) {
  const { memoTitle, memoColor, memoText } = await getMemoById(slug)
    .then((res) => {
      if (!res.ok) throw new Error('error');
      return res.json();
    })
    .catch(console.error);

  return (
    <MemoViewer
      title={memoTitle}
      content={JSON.parse(memoText)}
      color={memoColor}
      memoId={slug}
    />
  );
}
