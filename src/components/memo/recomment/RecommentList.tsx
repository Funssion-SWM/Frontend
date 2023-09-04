import { Comment } from '@/types/comment';
import RecommentItem from './RecommentItem';
import { useEffect, useState } from 'react';
import { checkUser } from '@/service/auth';

type Props = {
  recomments: Comment[];
  commentId: number;
  onClick: (recomments: Comment[]) => void;
};

export default function RecommentList({
  recomments,
  commentId,
  onClick,
}: Props) {
  const [uid, setUid] = useState<number | null>(null);

  async function first() {
    await checkUser().then((data) => setUid(data.id));
  }

  useEffect(() => {
    first();
  }, []);

  return (
    <ul className="flex flex-col">
      {recomments.map((item) => (
        <li key={item.id}>
          <RecommentItem
            commentProperty={item}
            commentId={commentId}
            isMyComment={item.authorId === uid}
            onClick={(recomments) => onClick(recomments)}
          />
        </li>
      ))}
    </ul>
  );
}
