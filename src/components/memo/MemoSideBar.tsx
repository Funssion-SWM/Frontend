'use client';

import CommentsList from '@/components/memo/comment/CommentsList';
import { Comment } from '@/types/comment';
import MemoSidebarHeader from './MemoSidebarHeader';
import CommentForm from '@/components/memo/comment/CommentForm';
import arrowRight from '@/assets/icons/arrow_right.svg';
import Image from 'next/image';
import { useState } from 'react';

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
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="sticky top-24 flex max-h-for-fit-screen  ">
      <button
        className={`flex z-10 absolute -left-10 sm:-left-3 justify-center items-center opacity-50 w-10 h-10 shadow-inner bg-white rounded-full self-center ${
          !isVisible && '-scale-x-100'
        }`}
        onClick={() => setIsVisible((pre) => !pre)}
      >
        <Image src={arrowRight} alt="arrowBtn" />
      </button>
      {isVisible && (
        <aside
          className={`ml-4 absolute right-0 top-0 sm:static h-full bg-white flex flex-col rounded-2xl shadow min-w-[300px]`}
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
      )}
    </div>
  );
}
