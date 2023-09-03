import { Comment } from '@/types/comment';
import RecommentList from './RecommentList';
import RecommentForm from './RecommentForm';
import { useEffect, useState } from 'react';
import { getRecommentsByCommentId } from '@/service/comments';

type Props = {
  commentId: number;
  authorId: number;
};

export default function RecommentContainer({ commentId, authorId }: Props) {
  const [recomments, setRecomments] = useState<Comment[]>([]);

  const first = async () => {
    getRecommentsByCommentId(commentId).then((data) => setRecomments(data));
  };

  useEffect(() => {
    first();
  }, []);

  return (
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
          onClick={(data) => {
            setRecomments(data);
          }}
        />
      )}
    </div>
  );
}
