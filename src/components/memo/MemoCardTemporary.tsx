import Link from 'next/link';
import { Memo } from '@/types/memo';
import { deleteMemo } from '@/service/memos';
import { useContext } from 'react';
import { ModalContext } from '@/context/ModalProvider';
import { useRouter } from 'next/navigation';

type Props = {
  memo: Memo;
  delBtnIsVisible?: boolean;
};

export default function MemoCardTemporary({
  memo: { memoId, memoTitle, memoDescription, memoColor, createdDate },
  delBtnIsVisible = true,
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
      <p className="text-soma-grey-50 text-sm">
        {createdDate.substring(0, 10)}
      </p>
      <Link href={`/create/memo?id=${memoId}`} prefetch={false}>
        <h2 className="text-2xl text-soma-grey-70 font-extrabold my-3 line-clamp-2 break-all h-16">
          {memoTitle}
        </h2>
        <p className="line-clamp-3 break-all my-1 text-soma-grey-60">
          {memoDescription}
        </p>
      </Link>
      {delBtnIsVisible && (
        <button
          className="absolute right-4 bottom-4 text-sm text-soma-grey-49"
          onClick={() =>
            open('임시 메모를 삭제하시겠습니까?', () => {
              deleteMemo(memoId).then(() => router.refresh());
            })
          }
        >
          삭제
        </button>
      )}
    </article>
  );
}
