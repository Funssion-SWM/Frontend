import Link from 'next/link';
import MemoCardHeader from './MemoCardHeader';
import { Memo } from '@/types/memo';
import { deleteMemo } from '@/service/memos';
import { useContext } from 'react';
import { ModalContext } from '@/context/ModalProvider';
import { useRouter } from 'next/navigation';

type Props = {
  memo: Memo;
};

export default function MemoCardTemporary({
  memo: { memoId, memoTitle, memoDescription, memoColor, createdDate },
}: Props) {
  const { open } = useContext(ModalContext);
  const router = useRouter();

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
      <p className="text-soma-grey-50 text-sm">{createdDate}</p>
      <Link href={`/create/memo/${memoId}`} prefetch={false}>
        <h2 className="text-2xl font-bold my-5 line-clamp-2 break-all">
          {memoTitle}
        </h2>
        <p className="line-clamp-3 break-all">{memoDescription}</p>
      </Link>
      <button
        className="absolute right-4 bottom-4 text-sm"
        onClick={() =>
          open('임시 메모를 삭제하시겠습니까?', () => {
            deleteMemo(memoId).then(() => router.refresh());
          })
        }
      >
        삭제
      </button>
    </article>
  );
}
