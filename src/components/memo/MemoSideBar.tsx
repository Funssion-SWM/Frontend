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
      className={`ml-3 sticky flex flex-col top-24 rounded-lg basis-1/4 border-[1px] border-soma-grey-30 max-h-for-fit-screen min-w-[300px]`}
    >
      <MemoSidebarHeader
        authorId={authorId}
        authorName={authorName}
        authorProfileImagePath={authorProfileImagePath}
      />
      <CommentsList comments={comments} userId={userId} />
      <div className="sticky bottom-0 p-1 bg-white shadow-inner">
        <CommentForm postId={memoId} />
      </div>
    </aside>
  );
}
