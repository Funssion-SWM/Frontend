import { useDetectOutsideClick } from '@/hooks/useDeleteOutsideClick';
import { checkUser } from '@/service/auth';
import { useEffect, useRef, useState } from 'react';
import Like from '../shared/Like';
import { useRouter } from 'next/navigation';
import { deleteMemo } from '@/service/memos';
import more from '../../assets/icons/more.svg';
import Image from 'next/image';

type Props = {
  memoId: number;
  authorId: number;
  likes: number;
};

export default function MemoViewerHeader({ memoId, authorId, likes }: Props) {
  const dropdownRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [uid, setUid] = useState<number | null>(null);
  const router = useRouter();

  async function first() {
    await checkUser().then((data) => setUid(data.id));
  }

  useEffect(() => {
    first();
  }, []);

  const handleDelete = () =>
    deleteMemo(memoId).then(() => {
      router.push('/');
      router.refresh();
    });

  return (
    <div className="py-4 flex justify-end items-center">
      <nav className="relative flex items-center" ref={dropdownRef}>
        <Like likes={likes} memoId={memoId} uid={uid} />
        {authorId === uid && (
          <div className="flex">
            <button onClick={() => setIsActive((pre) => !pre)}>
              <Image src={more} alt="more" />
            </button>
            <nav
              className={`absolute top-6 right-0 bg-white flex flex-col gap-1 rounded-lg shadow-inner ${
                isActive ? 'visible' : 'invisible'
              }`}
            >
              <button
                className="hover:bg-gray-200 p-2 rounded-t-lg"
                onClick={() => {
                  setIsActive(false);
                  router.push(`/create/memo/${memoId}`);
                }}
              >
                수정하기
              </button>
              <button
                className="hover:bg-gray-200 p-2 rounded-b-lg"
                onClick={() => {
                  setIsActive(false);
                  handleDelete();
                }}
              >
                삭제하기
              </button>
            </nav>
          </div>
        )}
      </nav>
    </div>
  );
}
