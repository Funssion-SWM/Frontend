'use client';

import { Comment } from '@/types/comment';
import CommentItem from './CommentItem';
import { checkUser } from '@/service/auth';
import { useEffect, useState } from 'react';

type Props = {
  comments: Comment[];
};

export default function CommentsList({ comments }: Props) {
  const [uid, setUid] = useState<number | null>(null);

  async function first() {
    await checkUser().then((data) => setUid(data.id));
  }

  useEffect(() => {
    comments.length !== 0 && first();
  }, []);

  return comments.length === 0 ? (
    <p className="flex justify-center items-center h-full text-sm text-soma-grey-49">
      작성된 댓글이 없습니다...
    </p>
  ) : (
    <ul className="flex flex-col h-full overflow-y-scroll">
      {comments.map((item) => (
        <li key={item.id}>
          <CommentItem
            commentProperty={item}
            isMyComment={uid === item.authorId}
          />
        </li>
      ))}
    </ul>
  );
}
