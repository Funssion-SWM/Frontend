import { createComment } from '@/service/comments';
import { notifyToast } from '@/service/notification';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';

type Props = {
  postId: number;
  postType: 'MEMO' | 'QUESTION' | 'ANSWER';
  onClick: () => void;
};

// onClick : client side에서 상태 업데이트하는 용도
export default function CommentForm({ postId, postType, onClick }: Props) {
  const [commentText, setCommentText] = useState('');
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key == 'Enter' && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (commentText === '') {
      window.alert('댓글을 작성해주세요');
      return;
    }
    createComment({ postTypeWithComment: postType, postId, commentText }).then(
      (res) => {
        if (res.code) {
          if (res.code === 401) router.push('/login');
          notifyToast(res.message, 'error');
          return;
        }
        setCommentText('');
        onClick();
        router.refresh();
      }
    );
  };

  return (
    <form className="flex w-full my-2 text-[13px]" onSubmit={handleSubmit} ref={formRef}>
      <textarea
        id="comment"
        name="comment"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="댓글을 작성하세요.."
        className="grow pl-2 outline-none resize-none align-middle inline-block"
      />
      <button className="w-fit px-2 text-soma-grey-45">작성</button>
    </form>
  );
}
