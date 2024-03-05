import Image from 'next/image';
import Link from 'next/link';
import { useContext, useRef } from 'react';
import { useDetectOutsideClick } from '@/hooks/useDeleteOutsideClick';
import { useRouter } from 'next/navigation';
import { deleteAnswer, selectAnswer } from '@/service/answers';
import { ModalContext } from '@/context/ModalProvider';
import BlueBtn from '../shared/btn/BlueBtn';
import { notifyToast } from '@/utils/notify';
import RelativeDate from '../shared/RelativeDate';
import { Rank } from '@/types/rank';
import { getImageSrcFromRank } from '@/utils/rank';
import MoreOptions from '../shared/MoreOptions';
import { DefaultProfile } from '@/assets/svg';

type Props = {
  answerId: number;
  authorId: number;
  authorName: string;
  authorImagePath: string;
  createdDate: string;
  onUpdateBtnClick: () => void;
  onUpdate: () => void;
  isEditMode: boolean;
  isMyAnswer: boolean;
  isMyQuestion: boolean;
  isSolved: boolean;
  isSelected: boolean;
  questionId: number;
  authorRank: Rank;
};

export default function AnswerCardHeader({
  answerId,
  authorId,
  authorName,
  authorImagePath,
  createdDate,
  onUpdate,
  onUpdateBtnClick,
  isEditMode,
  isMyAnswer,
  isMyQuestion,
  isSolved,
  isSelected,
  questionId,
  authorRank,
}: Props) {
  const dropdownRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const router = useRouter();
  const { open } = useContext(ModalContext);

  const handleDelete = () => {
    setIsActive(false);
    open('답변을 삭제하시겠습니까?', () => {
      deleteAnswer(answerId).then((res) => {
        if ('code' in res) {
          notifyToast(res.message, 'error');
          return;
        }
        notifyToast(res.message, 'success');
        router.refresh();
      });
    });
  };

  const handleUpdateBtnClick = () => {
    onUpdateBtnClick();
    setIsActive(false);
  };

  const handleSelect = () => {
    open('이 답변을 채택하시겠습니까?', () => {
      selectAnswer(questionId, answerId).then((res) => {
        if ('code' in res) {
          notifyToast(res.message, 'error');
          return;
        }
        notifyToast(res.message, 'success');
        router.refresh();
      });
    });
  };

  return (
    <div className="flex justify-between">
      <div className="flex items-center">
        <div className="relative">
          <Link href={`/me/${authorId}`} prefetch={false}>
            <Image
              src={authorImagePath ?? DefaultProfile}
              alt="profileImg"
              width={36}
              height={36}
              className="object-cover rounded-full w-9 h-9"
            />
          </Link>
          <Image
            src={getImageSrcFromRank(authorRank)}
            alt="rank"
            width={30}
            height={30}
            className="absolute top-0 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <div className="ml-2">
          <h4 className="text-xs font-medium text-soma-grey-60 sm:text-base">
            {authorName}
          </h4>
          <RelativeDate date={createdDate} type="YMDHM" />
        </div>
      </div>
      {isEditMode ? (
        <BlueBtn text="수정" onClick={() => onUpdate()} size="small" />
      ) : (
        <nav className="relative flex items-center pl-10" ref={dropdownRef}>
          {isMyQuestion && !isSolved && (
            <BlueBtn text="채택하기" onClick={handleSelect} />
          )}
          {isMyAnswer && !isSelected && (
            <MoreOptions
              isActive={isActive}
              onClick={() => setIsActive((pre) => !pre)}
              onUpdateBtnClick={handleUpdateBtnClick}
              onDeleteBtnClick={handleDelete}
            />
          )}
        </nav>
      )}
    </div>
  );
}
