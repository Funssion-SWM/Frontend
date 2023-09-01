'use client';

import CommentsList from './CommentsList';
import { Comment } from '@/types/comment';
import MemoSidebarHeader from './MemoSidebarHeader';

type Props = {
  authorName: string;
  authorProfileImagePath: string;
  authorId: number;
  comments: Comment[];
};

export default function MemoSideBar({
  authorName,
  authorProfileImagePath,
  authorId,
  comments,
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
      <div className="sticky bottom-0 p-1 bg-white shadow-inner">
        <div className="flex w-full my-2 text-[13px]">
          <textarea
            placeholder="댓글을 작성하세요.."
            className="grow pl-2 outline-none resize-none align-middle	inline-block"
          />
          <button className="w-fit px-2 text-soma-grey-45">작성</button>
        </div>
      </div>
    </aside>
  );
}
