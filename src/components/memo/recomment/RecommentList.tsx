import { Comment } from '@/types/comment';
import RecommentItem from './RecommentItem';

type Props = {
  recomments: Comment[];
  commentId: number;
  userId: number;
  onClick: (recomments: Comment[]) => void;
};

export default function RecommentList({
  recomments,
  commentId,
  userId,
  onClick,
}: Props) {
  return (
    <ul className="flex flex-col">
      {recomments.map((item) => (
        <li key={item.id}>
          <RecommentItem
            commentProperty={item}
            commentId={commentId}
            isMyComment={item.authorId === userId}
            onClick={(recomments) => onClick(recomments)}
          />
        </li>
      ))}
    </ul>
  );
}
