import { getCommentsByPostTypeAndPostId } from '@/service/comments';
import { useEffect, useState } from 'react';
import CommentsList from '../memo/comment/CommentsList';
import { Comment } from '@/types/comment';
import CommentForm from '../memo/comment/CommentForm';

type Props = {
  answerId: number;
  userId: number;
};

export default function AnswerCommentContainer({ answerId, userId }: Props) {
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
        <div className="border-[0.5px] p-2 border-soma-grey-49 rounded-lg my-2 bg-white">
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
