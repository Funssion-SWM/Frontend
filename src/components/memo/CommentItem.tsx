import Image from 'next/image';
import basicProfileImg from '@/assets/profile.svg';
import { Comment } from '@/types/comment';
import Link from 'next/link';
import { deleteComeent, updateComment } from '@/service/comments';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import BlueBtn from '../shared/btn/BlueBtn';
import WhiteBtn from '../shared/btn/WhiteBtn';

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
  const router = useRouter();

  return (
    <div className="w-full border-b-2 border-soma-grey-30 p-3">
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
          value={updatedText}
          onChange={(e) => setUpdatedText(e.target.value)}
          className="text-sm my-2 text-soma-grey-60 outline-none resize-none"
        />
      ) : (
        <p className="text-sm my-2 text-soma-grey-60">{commentText}</p>
      )}
      <div className="flex justify-between items-center text-[10px]">
        <p>답글 보기</p>
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
                  deleteComeent(id);
                  router.refresh();
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
                  updateComment(id, updatedText);
                  setIsEditMode(false);
                  router.refresh();
                }}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
