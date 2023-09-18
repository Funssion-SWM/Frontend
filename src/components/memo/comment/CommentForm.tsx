'use client';

import { createComment } from '@/service/comments';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

type Props = {
  postId: number;
};

export default function CommentForm({ postId }: Props) {
  const [commentText, setCommentText] = useState('');
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (commentText === '') {
      window.alert('댓글을 작성해주세요');
      return;
    }
    createComment({ postTypeWithComment: 'MEMO', postId, commentText }).then(
      () => {
        setCommentText('');
        router.refresh();
      }
    );
  };

  return (
    <form className="flex w-full my-2 text-[13px]" onSubmit={handleSubmit}>
      <textarea
        id="comment"
        name="comment"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="댓글을 작성하세요.."
        className="grow pl-2 outline-none resize-none align-middle	inline-block"
      />
      <button className="w-fit px-2 text-soma-grey-45">작성</button>
    </form>
  );
}
