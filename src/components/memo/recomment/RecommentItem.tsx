import { Comment } from '@/types/comment';
import { useContext, useState } from 'react';
import WhiteBtn from '@/components/shared/btn/WhiteBtn';
import BlueBtn from '@/components/shared/btn/BlueBtn';
import { ModalContext } from '@/context/ModalProvider';
import {
  deleteRecomeent,
  getRecommentsByCommentId,
  updateRecomment,
} from '@/service/comments';
import CommentHeader from '../comment/CommentHeader';
import { notifyToast } from '@/service/notify';

type Props = {
  commentProperty: Comment;
  commentId: number;
  isMyComment: boolean;
  onClick: (recomments: Comment[]) => void;
};

export default function RecommentItem({
  commentProperty,
  commentId,
  isMyComment,
  onClick,
}: Props) {
  const {
    id,
    commentText,
    authorId,
    authorImagePath,
    authorName,
    isLike,
    likes,
    createdDate,
    authorRank,
    isUserDelete,
  } = commentProperty;

  const [updatedText, setUpdatedText] = useState(commentText);
  const [isEditMode, setIsEditMode] = useState(false);
  const { open } = useContext(ModalContext);

  return (
    <div className="w-full border-b-[0.5px] border-soma-grey-49 p-3 pl-7 ">
      <CommentHeader
        commentId={id}
        authorId={authorId}
        authorImagePath={authorImagePath}
        authorName={authorName}
        createdDate={createdDate}
        isLike={isLike}
        likeNum={likes}
        isRecomment={true}
        authorRank={authorRank}
      />
      {isEditMode ? (
        <textarea
          className="text-sm my-2 text-soma-grey-60 outline-none w-full resize-none rounded-lg px-3 py-1"
          value={updatedText}
          onChange={(e) => setUpdatedText(e.target.value)}
          onFocus={(e) => {
            e.target.selectionStart = e.target.value.length;
          }}
          autoFocus
        />
      ) : (
        <p className="text-sm my-2 text-soma-grey-60">{commentText}</p>
      )}
      <div className="flex justify-end items-center text-[10px]">
        {isMyComment &&
          !isUserDelete &&
          (!isEditMode ? (
            <div className="flex gap-2 ">
              <button
                onClick={() => {
                  setIsEditMode(true);
                }}
              >
                수정
              </button>
              <button
                onClick={() => {
                  open('답글을 삭제하시겠습니까?', () => {
                    deleteRecomeent(id).then(async (res) => {
                      if ('code' in res) {
                        notifyToast(res.message, 'error');
                        return;
                      }
                      notifyToast(res.message, 'success');
                      const recomments = await getRecommentsByCommentId(
                        commentId
                      );
                      onClick(recomments);
                    });
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
                    notifyToast('내용을 작성해주세요', 'warning');
                    return;
                  }
                  updateRecomment(id, updatedText).then(async (res) => {
                    if ('code' in res) {
                      notifyToast(res.message, 'error');
                      return;
                    }
                    const recomments = await getRecommentsByCommentId(
                      commentId
                    );
                    onClick(recomments);
                  });
                  setIsEditMode(false);
                }}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
