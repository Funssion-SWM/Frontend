import MemoViewer from '@/components/MemoViewer';
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
      <div className="my-2 self-end">
        <button className=" bg-black text-white px-2 rounded-lg mx-1">
          수정하기
        </button>
        <button className=" bg-black text-white px-2 rounded-lg mx-1">
          삭제하기
        </button>
      </div>
      <MemoViewer
        title={memoTitle}
        content={JSON.parse(memoText)}
        color={memoColor}
      />
    </section>
  );
}
