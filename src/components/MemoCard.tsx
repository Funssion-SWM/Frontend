import { Memo } from '@/service/memos';
import Link from 'next/link';
import MemoCardHeader from './MemoCardHeader';

type Props = {
  memo: Memo;
};

export default function MemoCard({
  memo: { memoId, memoTitle, memoText, memoColor, createdDate, authorName },
}: Props) {
  return (
    <Link href={`/memos/${memoId}`}>
      <article className="rounded-md shadow-md aspect-square p-4 bg-yellow-100">
        <MemoCardHeader createDate={createdDate} authorName={authorName} />
        <div>
          <h2 className="text-4xl font-bold my-4">{memoTitle}</h2>
          <p>{memoText}</p>
        </div>
      </article>
    </Link>
  );
}
