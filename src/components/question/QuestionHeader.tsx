import Image from 'next/image';
import LikeBox from '../shared/LikeBox';
import more from '@/assets/icons/more.svg';
import { useContext, useRef } from 'react';
import { useDetectOutsideClick } from '@/hooks/useDeleteOutsideClick';
import { useRouter } from 'next/navigation';
import { ModalContext } from '@/context/ModalProvider';
import { deleteQuestion } from '@/service/questions';
import { extractYMDHM } from '@/service/time';
import { notifyToast } from '@/service/notification';
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

  const handleDelete = () =>
    deleteQuestion(questionId).then((res) => {
      if (res?.code) {
        notifyToast(res.message, 'error');
        return;
      }
      router.push('/questions');
      router.refresh();
    });

  return (
    <div className="flex justify-between items-center">
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
                  router.push(
                    `/create/question/?id=${questionId}${
                      memoId ? `&memoId=${memoId}` : ''
                    }`
                  );
                  router.refresh();
                }}
              >
                수정하기
              </button>
              <button
                className="hover:bg-gray-200 p-2 rounded-b-lg"
                onClick={() => {
                  setIsActive(false);
                  open('질문을 삭제하시겠습니까?', () => {
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
