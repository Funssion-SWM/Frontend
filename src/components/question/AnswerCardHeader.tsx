import Image from 'next/image';
import Link from 'next/link';
import basicProfileImg from '@/assets/profile.svg';
import { formatDate } from '@/service/time';
import { useContext, useRef } from 'react';
import { useDetectOutsideClick } from '@/hooks/useDeleteOutsideClick';
import more from '@/assets/icons/more.svg';
import { useRouter } from 'next/navigation';
import { deleteAnswer, updateAnswer } from '@/service/answers';
import { ModalContext } from '@/context/ModalProvider';
import BlueBtn from '../shared/btn/BlueBtn';

type Props = {
  answerId: number;
  authorId: number;
  authorName: string;
  authorImagePath: string;
  createdDate: string;
  onUpdateBtnClick: () => void;
  onUpdate: () => void;
  isEditMode: boolean;
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
}: Props) {
  const dropdownRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const router = useRouter();
  const { open } = useContext(ModalContext);

  const handleDelete = () =>
    deleteAnswer(answerId).then(() => {
      router.refresh();
    });

  return (
    <div className="flex justify-between">
      <div className="flex items-center">
        <Link href={`/me/${authorId}`}>
          <Image
            src={authorImagePath ?? basicProfileImg}
            alt="profileImg"
            width={36}
            height={36}
            className="rounded-full w-9 h-9 object-cover"
          />
        </Link>
        <div className="ml-2">
          <h4 className="text-soma-grey-60 font-medium">{authorName}</h4>
          <p className="text-xs text-soma-grey-49">
            {formatDate(createdDate, 'YMDHM')}
          </p>
        </div>
      </div>
      {isEditMode ? (
        <BlueBtn text="수정" onClick={() => onUpdate()} size="small" />
      ) : (
        <nav className="relative flex items-center pl-10" ref={dropdownRef}>
          {isActive && (
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
                    onUpdateBtnClick();
                    setIsActive(false);
                  }}
                >
                  수정하기
                </button>
                <button
                  className="hover:bg-gray-200 p-2 rounded-b-lg"
                  onClick={() => {
                    setIsActive(false);
                    open('답변을 삭제하시겠습니까?', () => {
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
      )}
    </div>
  );
}
