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
      <article
        className={`rounded-md shadow-md aspect-square p-4 ${
          { yellow: 'bg-yellow-100', red: 'bg-red-100', green: 'bg-green-100' }[
            memoColor
          ]
        } `}
      >
        <MemoCardHeader createDate={createdDate} authorName={authorName} />
        <div>
          <h2 className="text-4xl font-bold my-4">{memoTitle}</h2>
          <p>{memoText}</p>
        </div>
      </article>
    </Link>
  );
}
