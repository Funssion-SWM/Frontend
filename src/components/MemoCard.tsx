import { Memo } from '@/service/memos';
import Link from 'next/link';
import MemoCardHeader from './MemoCardHeader';

type Props = {
  memo: Memo;
};

export default function MemoCard({
  memo: {
    memoId,
    memoTitle,
    memoDescription,
    memoColor,
    createdDate,
    authorName,
  },
}: Props) {
  return (
    <Link href={`/memos/${memoId}`}>
      <article
        className={`rounded-md shadow-md aspect-square p-4 ${
          {
            yellow: 'bg-memo-yellow',
            green: 'bg-memo-green',
            skyblue: 'bg-memo-skyblue',
            orange: 'bg-memo-orange',
            pink: 'bg-memo-pink',
            navy: 'bg-memo-navy',
            purple: 'bg-memo-purple',
          }[memoColor]
        } `}
      >
        <MemoCardHeader createDate={createdDate} authorName={authorName} />
        <h2 className="text-4xl font-bold my-7 line-clamp-2">{memoTitle}</h2>
        <p className="line-clamp-2">{memoDescription}</p>
      </article>
    </Link>
  );
}
