import { useDetectOutsideClick } from '@/hooks/useDeleteOutsideClick';
import { useContext, useRef } from 'react';
import Like from '../shared/Like';
import { useRouter } from 'next/navigation';
import { deleteMemo } from '@/service/memos';
import more from '../../assets/icons/more.svg';
import Image from 'next/image';
import { ModalContext } from '@/context/ModalProvider';

type Props = {
  memoId: number;
  likes: number;
  isLike: boolean;
  isMyMemo: boolean;
};

export default function MemoViewerHeader({
  memoId,
  likes,
  isLike,
  isMyMemo,
}: Props) {
  const dropdownRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const router = useRouter();
  const { open } = useContext(ModalContext);

  const handleDelete = () =>
    deleteMemo(memoId).then(() => {
      router.push('/memos');
      router.refresh();
    });

  return (
    <div className="py-4 flex justify-end items-center">
      <nav className="relative flex items-center" ref={dropdownRef}>
        <Like likes={likes} memoId={memoId} isLike={isLike} />
        {isMyMemo && (
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
                  router.refresh();
                }}
              >
                수정하기
              </button>
              <button
                className="hover:bg-gray-200 p-2 rounded-b-lg"
                onClick={() => {
                  setIsActive(false);
                  open('메모를 삭제하시겠습니까?', () => {
                    handleDelete();
                  });
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
