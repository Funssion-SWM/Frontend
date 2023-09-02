import Link from 'next/link';
import MemoCardHeader from './MemoCardHeader';
import { Memo } from '@/types/memo';

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
    authorId,
    authorName,
    authorProfileImagePath,
    likes,
  },
}: Props) {
  return (
    <article
      className={`flex flex-col relative rounded-md shadow-md aspect-square p-4 ${
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
      <MemoCardHeader
        createDate={createdDate}
        authorName={authorName}
        likes={likes}
        imagePath={authorProfileImagePath}
        authorId={authorId}
      />
      <Link href={`/memos/${memoId}`}>
        <h2 className="text-2xl font-bold my-5 line-clamp-2 break-all">
          {memoTitle}
        </h2>
        <p className="line-clamp-3 break-all">{memoDescription}</p>
      </Link>
    </article>
  );
}
