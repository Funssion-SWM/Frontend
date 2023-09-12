import CommentsList from '@/components/memo/comment/CommentsList';
import { Comment } from '@/types/comment';
import MemoSidebarHeader from './MemoSidebarHeader';
import CommentForm from '@/components/memo/comment/CommentForm';

type Props = {
  authorName: string;
  authorProfileImagePath: string;
  authorId: number;
  comments: Comment[];
  memoId: number;
  userId: number;
};

export default function MemoSideBar({
  authorName,
  authorProfileImagePath,
  authorId,
  comments,
  memoId,
  userId,
}: Props) {
  return (
    <aside
      className={`ml-5 sticky bg-white flex flex-col top-24 rounded-2xl basis-1/4 shadow max-h-for-fit-screen min-w-[300px]`}
    >
      <MemoSidebarHeader
        authorId={authorId}
        authorName={authorName}
        authorProfileImagePath={authorProfileImagePath}
      />
      <CommentsList comments={comments} userId={userId} />
      <div className="sticky bottom-0 p-1 bg-white shadow-inner rounded-b-2xl">
        <CommentForm postId={memoId} />
      </div>
    </aside>
  );
}
