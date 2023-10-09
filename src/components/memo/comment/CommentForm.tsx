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
  const [isCreateing, setIsCreating] = useState(false);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (commentText === '') {
      notifyToast('내용을 작성해주세요', 'warning');
      return;
    }
    setIsCreating(true);
    createComment({ postTypeWithComment: postType, postId, commentText }).then(
      (res) => {
        if (res.code) {
          if (res.code === 401) router.push('/login');
          notifyToast(res.message, 'error');
          setIsCreating(false);
          return;
        }
        setCommentText('');
        setIsCreating(false);
        onClick();
        router.refresh();
      }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key == 'Enter' && !e.shiftKey && !isCreateing) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  return (
    <form className="flex w-full text-[13px]" onSubmit={handleSubmit} ref={formRef}>
      <textarea
        id="comment"
        name="comment"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="댓글을 작성하세요.."
        className="grow pl-2 outline-none resize-none align-middle inline-block"
      />
      <button className="w-fit px-2 text-soma-blue-40 font-semibold">
        작성
      </button>
    </form>
  );
}
