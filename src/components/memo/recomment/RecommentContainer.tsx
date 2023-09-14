import { Comment } from '@/types/comment';
import RecommentList from './RecommentList';
import RecommentForm from './RecommentForm';
import { useEffect, useState } from 'react';
import { getRecommentsByCommentId } from '@/service/comments';

type Props = {
  commentId: number;
  authorId: number;
  userId: number;
};

export default function RecommentContainer({
  commentId,
  authorId,
  userId,
}: Props) {
  const [recomments, setRecomments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const first = async () => {
      getRecommentsByCommentId(commentId)
        .then((data) => setRecomments(data))
        .finally(() => setLoading(false));
    };
    first();
  }, []);

  return (
    !loading && (
      <div className="flex flex-col">
        <div className="shadow-inner bg-soma-grey-20 p-1">
          <RecommentForm
            parentCommentId={commentId}
            authorId={authorId}
            onSubmit={(data) => {
              setRecomments(data);
            }}
          />
        </div>
        {recomments.length !== 0 && (
          <RecommentList
            recomments={recomments}
            commentId={commentId}
            userId={userId}
            onClick={(data) => {
              setRecomments(data);
            }}
          />
        )}
      </div>
    )
  );
}
