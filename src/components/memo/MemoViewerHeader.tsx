import { useDetectOutsideClick } from '@/hooks/useDeleteOutsideClick';
import { useContext, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { deleteMemo } from '@/service/memos';
import more from '../../assets/icons/more.svg';
import Image from 'next/image';
import { ModalContext } from '@/context/ModalProvider';
import LikeBox from '../shared/LikeBox';
import { extractYMDHM } from '@/service/time';
import { notifyToast } from '@/service/notify';
import Link from 'next/link';

type Props = {
  memoId: number;
  likes: number;
  isLike: boolean;
  isMyMemo: boolean;
  createdDate: string;
  seriesId: number;
  seriesTitle: string;
};

export default function MemoViewerHeader({
  memoId,
  likes,
  isLike,
  isMyMemo,
  createdDate,
  seriesId,
  seriesTitle,
}: Props) {
  const dropdownRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const router = useRouter();
  const { open } = useContext(ModalContext);

  const handleDelete = () =>
    deleteMemo(memoId).then((res) => {
      if (res?.code) {
        notifyToast(res.message, 'error');
        return;
      }
      notifyToast('성공적으로 메모가 삭제되었습니다.', 'success');
      router.push('/memos');
      router.refresh();
    });

  return (
    <div className="p-4 flex justify-between items-center">
      <div className="text-sm text-soma-grey-49">
        {extractYMDHM(createdDate)}
      </div>
      <nav className="relative flex items-center pl-5" ref={dropdownRef}>
        {seriesId && (
          <div className="text-xs mx-4 text-soma-grey-70">
            {`🔗 Series `}
            <Link
              href={`/series/${seriesId}`}
              className="text-soma-blue-40 font-extrabold underline "
            >
              {seriesTitle}
            </Link>
            에 속한 메모
          </div>
        )}
        <LikeBox
          likeNum={likes}
          postId={memoId}
          isLike={isLike}
          postType="memo"
          iconSize={20}
        />
        {isMyMemo && (
          <div className="flex ml-2">
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
                  router.push(`/create/memo/?id=${memoId}`);
                  router.refresh();
                }}
              >
                수정하기
              </button>
              <button
                className="hover:bg-gray-200 p-2 rounded-b-lg"
                onClick={() => {
                  setIsActive(false);
                  open(
                    seriesId
                      ? '시리즈에 속한 메모입니다. 메모를 삭제하시겠습니까?'
                      : '메모를 삭제하시겠습니까?',
                    () => {
                      handleDelete();
                    }
                  );
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
