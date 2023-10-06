import { Comment } from '@/types/comment';
import CommentItem from './CommentItem';

type Props = {
  comments: Comment[];
  userId: number;
  onClick: () => void;
};

export default function CommentsList({ comments, userId, onClick }: Props) {
  return (
    <ul className="flex flex-col h-full overflow-y-auto">
      {comments.map((item) => (
        <li key={item.id}>
          <CommentItem
            commentProperty={item}
            isMyComment={userId === item.authorId}
            userId={userId}
            onClick={onClick}
          />
        </li>
      ))}
    </ul>
  );
}
