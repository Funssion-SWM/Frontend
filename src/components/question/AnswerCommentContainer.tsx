import { getCommentsByPostTypeAndPostId } from '@/service/comments';
import { useEffect, useState } from 'react';
import CommentsList from '../memo/comment/CommentsList';
import { Comment } from '@/types/comment';
import CommentForm from '../memo/comment/CommentForm';

type Props = {
  answerId: number;
  authorId: number;
  userId: number;
};

export default function AnswerCommentContainer({
  answerId,
  authorId,
  userId,
}: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [useEffectUpdate, setUseEffectUpdate] = useState(true);

  useEffect(() => {
    const first = async () => {
      getCommentsByPostTypeAndPostId('answer', answerId)
        .then((data) => setComments(data))
        .finally(() => setLoading(false));
    };
    first();
  }, [useEffectUpdate]);

  return (
    !loading && (
      <div className="flex flex-col">
        <div className="shadow-inner bg-soma-grey-20 p-1">
          <CommentForm
            postId={answerId}
            postType={'ANSWER'}
            onClick={() => setUseEffectUpdate((pre) => !pre)}
          />
        </div>
        {comments.length !== 0 && (
          <CommentsList
            comments={comments}
            userId={userId}
            onClick={() => setUseEffectUpdate((pre) => !pre)}
          />
        )}
      </div>
    )
  );
}
