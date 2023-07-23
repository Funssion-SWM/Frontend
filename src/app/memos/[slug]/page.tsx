import MemoViewer from '@/components/MemoViewer';
import WriterBtns from '@/components/WriterBtns';
import { getMemoById } from '@/service/memos';

type Props = {
  params: {
    slug: number;
  };
};

export default async function MemoPage({ params: { slug } }: Props) {
  const { memoTitle, memoColor, memoText } = await getMemoById(slug)
    .then((res) => {
      if (!res.ok) throw new Error('error');
      return res.json();
    })
    .catch(console.error);

  return (
    <section className="flex flex-col">
      <WriterBtns memoId={slug} />
      <MemoViewer
        title={memoTitle}
        content={JSON.parse(memoText)}
        color={memoColor}
      />
    </section>
  );
}
