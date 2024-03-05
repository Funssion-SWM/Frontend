import Link from 'next/link';
import { Memo } from '@/types/memo';
import { deleteMemo } from '@/service/memos';
import { useContext } from 'react';
import { ModalContext } from '@/context/ModalProvider';
import { useRouter } from 'next/navigation';
import { notifyToast } from '@/utils/notify';

type Props = {
  memo: Memo;
  delBtnIsVisible?: boolean;
  isMine?: boolean;
};

export default function MemoCardTemporary({
  memo: { memoId, memoTitle, memoDescription, memoColor, createdDate },
  delBtnIsVisible = true,
  isMine = false,
}: Props) {
  const { open } = useContext(ModalContext);
  const router = useRouter();

  return (
    <article
      className={`flex flex-col relative rounded-md shadow-md aspect-square p-4 ${
        {
          white: 'bg-soma-white',
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
      <Link href={`/create/memo?id=${memoId}&temp=true`} prefetch={false}>
        <h2 className="text-2xl text-soma-grey-70 font-extrabold my-3 line-clamp-2 break-all h-16">
          {memoTitle}
        </h2>
        <p className="line-clamp-3 break-all my-1 text-soma-grey-60">
          {memoDescription}
        </p>
      </Link>
      {delBtnIsVisible && isMine && (
        <button
          className="absolute right-4 bottom-4 text-sm text-soma-grey-49"
          onClick={() =>
            open('임시 메모를 삭제하시겠습니까?', () => {
              deleteMemo(memoId).then((res) => {
                if (res?.code) {
                  notifyToast(res.message, 'error');
                  return;
                }
                router.refresh();
              });
            })
          }
        >
          삭제
        </button>
      )}
    </article>
  );
}
