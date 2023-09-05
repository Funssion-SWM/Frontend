import { Comment } from '@/types/comment';
import basicProfileImg from '@/assets/profile.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import WhiteBtn from '@/components/shared/btn/WhiteBtn';
import BlueBtn from '@/components/shared/btn/BlueBtn';
import { ModalContext } from '@/context/ModalProvider';
import {
  deleteRecomeent,
  getRecommentsByCommentId,
  updateRecomment,
} from '@/service/comments';

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
    createdDate,
  } = commentProperty;

  const [updatedText, setUpdatedText] = useState(commentText);
  const [isEditMode, setIsEditMode] = useState(false);
  const { open } = useContext(ModalContext);

  return (
    <div className="w-full border-t-2 border-soma-grey-30 p-3 pl-6 bg-soma-grey-20">
      <div className="flex items-center">
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
          className="text-sm my-2 text-soma-grey-60 outline-none w-full resize-none"
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
                    deleteRecomeent(id).then(async () => {
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
                    window.alert('댓글을 작성해주세요');
                    return;
                  }
                  updateRecomment(id, updatedText).then(async () => {
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
