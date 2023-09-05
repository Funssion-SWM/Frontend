import { createRecomment, getRecommentsByCommentId } from '@/service/comments';
import { Comment } from '@/types/comment';
import { FormEvent, useState } from 'react';

type Props = {
  authorId: number;
  parentCommentId: number;
  onSubmit: (recomments: Comment[]) => void;
};

export default function RecommentForm({
  authorId,
  parentCommentId,
  onSubmit,
}: Props) {
  const [recommentText, setRecommentText] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (recommentText === '') {
      window.alert('댓글을 작성해주세요');
      return;
    }
    createRecomment({
      parentCommentId,
      authorId,
      commentText: recommentText,
    }).then(async () => {
      const recomments = await getRecommentsByCommentId(parentCommentId);
      onSubmit(recomments);
    });
    setRecommentText('');
  };

  return (
    <form className="flex w-full my-2 text-[13px] px-2" onSubmit={handleSubmit}>
      <textarea
        id="recomment"
        name="recomment"
        value={recommentText}
        onChange={(e) => setRecommentText(e.target.value)}
        placeholder="답글을 작성하세요.."
        className="grow pl-2 outline-none resize-none align-middle inline-block rounded-lg"
      />
      <button className="w-fit px-2 text-soma-grey-50">작성</button>
    </form>
  );
}
