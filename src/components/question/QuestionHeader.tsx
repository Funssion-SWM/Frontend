import LikeBox from '../shared/LikeBox';
import { useContext, useRef } from 'react';
import { useDetectOutsideClick } from '@/hooks/useDeleteOutsideClick';
import { useRouter } from 'next/navigation';
import { ModalContext } from '@/context/ModalProvider';
import { deleteQuestion } from '@/service/questions';
import { extractYMDHM } from '@/service/time';
import { notifyToast } from '@/service/notify';
import MoreOptions from '../shared/MoreOptions';
type Props = {
  questionId: number;
  likeNum: number;
  createdDate: string;
  memoId: number;
  isMyQuestion: boolean;
  isLike: boolean;
};

export default function QuestionHeader({
  questionId,
  likeNum,
  createdDate,
  memoId,
  isMyQuestion,
  isLike,
}: Props) {
  const dropdownRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const router = useRouter();
  const { open } = useContext(ModalContext);

  const handleDelete = () => {
    setIsActive(false);
    open('질문을 삭제하시겠습니까?', () => {
      deleteQuestion(questionId).then((res) => {
        if ('code' in res) {
          notifyToast(res.message, 'error');
          return;
        }
        notifyToast(res.message, 'success');
        router.push('/questions');
        router.refresh();
      });
    });
  };

  const handleUpdateBtnClick = () => {
    setIsActive(false);
    router.push(
      `/create/question/?id=${questionId}${memoId ? `&memoId=${memoId}` : ''}`
    );
    router.refresh();
  };

  return (
    <div className="flex items-center justify-between">
      <div className="text-sm text-soma-grey-49">
        {extractYMDHM(createdDate)}
      </div>

      <nav className="relative flex items-center pl-5" ref={dropdownRef}>
        <LikeBox
          likeNum={likeNum}
          postId={questionId}
          isLike={isLike}
          postType="question"
          iconSize={20}
        />
        {isMyQuestion && (
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
