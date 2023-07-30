'use client';

import { deleteMemo } from '@/service/memos';
import { useRouter } from 'next/navigation';
import BlueBtn from './BlueBtn';

type Props = {
  memoId: number;
};

export default function WriterBtns({ memoId }: Props) {
  const router = useRouter();
  const handleDelete = () =>
    deleteMemo(memoId).then(() => {
      router.push('/');
      router.refresh();
    });

  return (
    <section className="self-end">
      <BlueBtn
        text="수정하기"
        onClick={() => router.push(`/create/memo/${memoId}`)}
        extraStyle="mr-1"
      />
      <BlueBtn text="삭제하기" onClick={handleDelete} />
    </section>
  );
}
