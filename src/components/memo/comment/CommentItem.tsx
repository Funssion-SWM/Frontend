import Image from 'next/image';
import basicProfileImg from '@/assets/profile.svg';
import { Comment } from '@/types/comment';
import Link from 'next/link';
import { deleteComeent, updateComment } from '@/service/comments';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import BlueBtn from '@/components/shared/btn/BlueBtn';
import WhiteBtn from '@/components/shared/btn/WhiteBtn';
import { ModalContext } from '@/context/ModalProvider';
import RecommentContainer from '@/components/memo/recomment/RecommentContainer';

type Props = {
  commentProperty: Comment;
  isMyComment: boolean;
};

export default function CommentItem({ commentProperty, isMyComment }: Props) {
  const {
    id,
    commentText,
    authorId,
    authorImagePath,
    authorName,
    createdDate,
  } = commentProperty;

  const [updatedText, setUpdatedText] = useState(commentText);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isRecommentBtnClicked, setIsRecommentBtnClicked] = useState(false);
  const { open } = useContext(ModalContext);
  const router = useRouter();

  return (
    <div className="w-full border-b-2 border-soma-grey-30 pt-3">
      <div className="flex items-center pl-3">
        <Link href={`/me/${authorId}`}>
          <Image
            src={authorImagePath ?? basicProfileImg}
            alt="profileImg"
            width={28}
            height={28}
            className="rounded-full w-7 h-7 object-cover "
          />
        </Link>
        <div className="ml-2 text-xs">
          <div className="text-soma-grey-60">{authorName}</div>
          <p className="text-xs text-soma-grey-49">
            {createdDate.substring(0, 10)}
          </p>
        </div>
      </div>
      {isEditMode ? (
        <textarea
          className="px-3 text-sm my-2 text-soma-grey-60 outline-none w-full resize-none"
          value={updatedText}
          onChange={(e) => setUpdatedText(e.target.value)}
          onFocus={(e) => {
            e.target.selectionStart = e.target.value.length;
          }}
          autoFocus
        />
      ) : (
        <p className="pl-3 text-sm my-2 text-soma-grey-60">{commentText}</p>
      )}
      <div className="flex justify-between items-center text-[10px] mb-3 pl-3 mr-2">
        <button onClick={() => setIsRecommentBtnClicked((pre) => !pre)}>
          {isRecommentBtnClicked ? '답글 닫기' : '답글 보기'}
        </button>
        {isMyComment &&
          (!isEditMode ? (
            <div className="flex gap-2 r-3">
              <button
                onClick={() => {
                  setIsEditMode(true);
                }}
              >
                수정
              </button>
              <button
                onClick={() => {
                  open('댓글을 삭제하시겠습니까?', () => {
                    deleteComeent(id);
                    router.refresh();
                  });
                }}
              >
                삭제
              </button>
            </div>
          ) : (
            <div className="flex gap-1 ">
              <WhiteBtn
                text="취소"
                onClick={() => {
                  setIsEditMode(false);
                  setUpdatedText(commentText);
                }}
                size="small"
              />
              <BlueBtn
                text="수정"
                size="small"
                onClick={() => {
                  if (updatedText === '') {
                    window.alert('댓글을 작성해주세요');
                    return;
                  }
                  updateComment(id, updatedText);
                  setIsEditMode(false);
                  router.refresh();
                }}
              />
            </div>
          ))}
      </div>
      {isRecommentBtnClicked && (
        <RecommentContainer commentId={id} authorId={authorId} />
      )}
    </div>
  );
}
