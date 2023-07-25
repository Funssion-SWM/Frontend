'use client';

import { deleteMemo } from '@/service/memos';
import { useRouter } from 'next/navigation';

type Props = {
  memoId: number;
};

export default function WriterBtns({ memoId }: Props) {
  const router = useRouter();
  const handleDelete = () => {
    deleteMemo(memoId)
      .then((res) => {
        if (!res.ok) {
          throw new Error('error');
        }
        router.push('/');
        router.refresh();
      })
      .catch(console.error);
  };
  return (
    <div className="my-2 self-end">
      <button
        className=" bg-black text-white px-2 rounded-lg mx-1"
        onClick={() => router.push(`/create/memo/${memoId}`)}
      >
        수정하기
      </button>
      <button
        className=" bg-black text-white px-2 rounded-lg mx-1"
        onClick={handleDelete}
      >
        삭제하기
      </button>
    </div>
  );
}
