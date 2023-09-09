'use client';

import { Comment } from '@/types/comment';
import { deleteComeent, updateComment } from '@/service/comments';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import BlueBtn from '@/components/shared/btn/BlueBtn';
import WhiteBtn from '@/components/shared/btn/WhiteBtn';
import { ModalContext } from '@/context/ModalProvider';
import RecommentContainer from '@/components/memo/recomment/RecommentContainer';
import CommentHeader from './CommentHeader';

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
    isLike,
    likes,
    reCommentsNumber,
  } = commentProperty;

  const [updatedText, setUpdatedText] = useState(commentText);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isRecommentBtnClicked, setIsRecommentBtnClicked] = useState(false);
  const { open } = useContext(ModalContext);
  const router = useRouter();

  return (
    <div className="w-full border-b-2 border-soma-grey-30 pt-3">
      <CommentHeader
        commentId={id}
        authorId={authorId}
        authorImagePath={authorImagePath}
        authorName={authorName}
        createdDate={createdDate}
        isLike={isLike}
        likeNum={likes}
      />
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
        <button
          className="text-soma-blue-40 font-semibold"
          onClick={() => setIsRecommentBtnClicked((pre) => !pre)}
        >
          {isRecommentBtnClicked
            ? '답글 닫기'
            : reCommentsNumber === 0
            ? '답글 작성'
            : `${reCommentsNumber}개의 답글`}
        </button>
        {isMyComment &&
          (!isEditMode ? (
            <div className="flex gap-2 r-3 text-soma-grey-49">
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
