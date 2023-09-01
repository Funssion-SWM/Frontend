'use client';

import CommentsList from './CommentsList';
import { Comment } from '@/types/comment';
import MemoSidebarHeader from './MemoSidebarHeader';
import CommentForm from './CommentForm';

type Props = {
  authorName: string;
  authorProfileImagePath: string;
  authorId: number;
  comments: Comment[];
  memoId: number;
};

export default function MemoSideBar({
  authorName,
  authorProfileImagePath,
  authorId,
  comments,
  memoId,
}: Props) {
  return (
    <aside
      className={`ml-3 sticky flex flex-col top-24 rounded-lg basis-1/4 border-[1px] border-soma-grey-30 max-h-for-fit-screen overflow-y-scroll min-w-[300px]`}
    >
      <MemoSidebarHeader
        authorId={authorId}
        authorName={authorName}
        authorProfileImagePath={authorProfileImagePath}
      />
      <CommentsList comments={comments} />
      <CommentForm postId={memoId} />
    </aside>
  );
}
