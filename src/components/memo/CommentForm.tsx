import { createComment } from '@/service/comments';
import { FormEvent, useState } from 'react';

type Props = {
  postId: number;
};

export default function CommentForm({ postId }: Props) {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    createComment({ postTypeWithComment: 'MEMO', postId, commentText });
  };

  return (
    <div className="sticky bottom-0 p-1 bg-white shadow-inner">
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
    </div>
  );
}
