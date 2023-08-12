'use client';

import { deleteMemo } from '@/service/memos';
import { useRouter } from 'next/navigation';
import OutlineEdit from '../ui/icons/outline-edit';
import OutlineWastebasket from '../ui/icons/outline-wastebasket';

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
    <section>
      <button className='mr-2' onClick={() => router.push(`/create/memo/${memoId}`)}>
        <OutlineEdit className='w-5 h-5 inline-block mr-1' />
        <span>수정하기</span>
      </button>
      <button onClick={handleDelete}>
        <OutlineWastebasket className='w-5 h-5 inline-block mr-1' />
        <span>삭제하기</span>
      </button>
    </section>
  );
}
