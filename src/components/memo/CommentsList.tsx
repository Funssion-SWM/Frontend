import { Comment } from '@/types/comment';
import CommentItem from './CommentItem';

type Props = {
  comments: Comment[];
};

export default function CommentsList({ comments }: Props) {
  return comments.length === 0 ? (
    <p className="flex justify-center items-center h-full text-sm text-soma-grey-49">
      작성된 댓글이 없습니다...
    </p>
  ) : (
    <ul className="flex flex-col h-full overflow-y-scroll">
      {comments.map((item) => (
        <li key={item.id}>
          <CommentItem commentProperty={item} />
        </li>
      ))}
    </ul>
  );
}
