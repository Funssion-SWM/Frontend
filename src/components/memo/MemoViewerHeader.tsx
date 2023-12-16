import { useDetectOutsideClick } from '@/hooks/useDeleteOutsideClick';
import { useContext, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { deleteMemo } from '@/service/memos';
import { ModalContext } from '@/context/ModalProvider';
import LikeBox from '../shared/LikeBox';
import { extractYMDHM } from '@/service/time';
import { notifyToast } from '@/service/notify';
import Link from 'next/link';
import MoreOptions from '../shared/MoreOptions';

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

  const handleDelete = () => {
    setIsActive(false);
    open(
      seriesId
        ? '시리즈에 속한 메모입니다. 메모를 삭제하시겠습니까?'
        : '메모를 삭제하시겠습니까?',
      () => {
        deleteMemo(memoId).then((res) => {
          if (res?.code) {
            notifyToast(res.message, 'error');
            return;
          }
          notifyToast('성공적으로 메모가 삭제되었습니다.', 'success');
          router.push('/memos');
          router.refresh();
        });
      }
    );
  };

  const handleUpdateBtnClick = () => {
    setIsActive(false);
    router.push(`/create/memo/?id=${memoId}`);
    router.refresh();
  };

  return (
    <div className="flex items-center justify-between p-4">
      <div className="text-sm text-soma-grey-49">
        {extractYMDHM(createdDate)}
      </div>
      <nav className="relative flex items-center pl-5" ref={dropdownRef}>
        {seriesId && (
          <div className="hidden mx-4 text-xs text-soma-grey-70 sm:block">
            {`🔗 Series `}
            <Link
              href={`/series/${seriesId}`}
              className="font-extrabold underline text-soma-blue-40 "
              prefetch={false}
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
          <MoreOptions
            isActive={isActive}
            onClick={() => setIsActive((pre) => !pre)}
            onUpdateBtnClick={handleUpdateBtnClick}
            onDeleteBtnClick={handleDelete}
          />
        )}
      </nav>
    </div>
  );
}
