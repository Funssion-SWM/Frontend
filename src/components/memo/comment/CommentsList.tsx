import { Comment } from '@/types/comment';
import CommentItem from './CommentItem';

type Props = {
  comments: Comment[];
  userId: number;
};

export default function CommentsList({ comments, userId }: Props) {
  return comments.length === 0 ? (
    <p className="flex justify-center items-center h-full text-sm text-soma-grey-49">
      작성된 댓글이 없습니다...
    </p>
  ) : (
    <ul className="flex flex-col h-full overflow-y-auto">
      {comments.map((item) => (
        <li key={item.id}>
          <CommentItem
            commentProperty={item}
            isMyComment={userId === item.authorId}
            userId={userId}
          />
        </li>
      ))}
    </ul>
  );
}
