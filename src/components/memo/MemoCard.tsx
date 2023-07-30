import Link from 'next/link';
import MemoCardHeader from './MemoCardHeader';
import { Memo } from '@/types';

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
    userName,
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
        <MemoCardHeader createDate={createdDate} userName={userName} />
        <h2 className="text-3xl font-bold my-7 line-clamp-2">{memoTitle}</h2>
        <p className="line-clamp-2">
          {/* {memoDescription} */}
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium
          dolores porro qui. Illum expedita iste, molestiae accusamus blanditiis
          totam facere molestias ut explicabo magni voluptatum! Nisi dicta sed
          quisquam vel.
        </p>
      </article>
    </Link>
  );
}
