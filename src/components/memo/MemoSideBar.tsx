'use client';

import CommentsList from '@/components/memo/comment/CommentsList';
import { Comment } from '@/types/comment';
import MemoSidebarHeader from './MemoSidebarHeader';
import CommentForm from '@/components/memo/comment/CommentForm';
import arrowRight from '@/assets/icons/arrow_right.svg';
import Image from 'next/image';
import { useState } from 'react';
import { Question } from '@/types/question';
import QuestionsList from '../question/QuestionsList';
import Link from 'next/link';

type Props = {
  authorName: string;
  authorProfileImagePath: string;
  authorId: number;
  comments: Comment[];
  questions: Question[];
  memoId: number;
  userId: number;
  isFollowed: boolean;
  isMyMemo: boolean;
  isLogin: boolean;
};

export default function MemoSideBar({
  authorName,
  authorProfileImagePath,
  authorId,
  comments,
  questions,
  memoId,
  userId,
  isFollowed,
  isMyMemo,
  isLogin,
}: Props) {
  const [isVisible, setIsVisible] = useState(true);
  const [currnetCategory, setCurrnetCategory] = useState<
    'comment' | 'question' | 'recommendation'
  >('comment');

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
            currentCategory={currnetCategory}
            onCategoryBtnClick={(category) => setCurrnetCategory(category)}
            isFollowed={isFollowed}
            isMyMemo={isMyMemo}
            isLogin={isLogin}
          />
          {currnetCategory === 'comment' && (
            <div className="h-full">
              {comments.length === 0 ? (
                <p className="flex justify-center items-center h-full text-sm text-soma-grey-49">
                  작성된 댓글이 없습니다...
                </p>
              ) : (
                <CommentsList
                  comments={comments}
                  userId={userId}
                  onClick={() => {}}
                />
              )}
            </div>
          )}
          {currnetCategory === 'comment' && (
            <div className="sticky bottom-0 p-1 bg-white shadow-inner rounded-b-2xl">
              <CommentForm
                postId={memoId}
                postType={'MEMO'}
                onClick={() => {}}
              />
            </div>
          )}
          {currnetCategory === 'question' && (
            <div className="h-full">
              {questions.length === 0 ? (
                <p className="flex justify-center items-center h-full text-sm text-soma-grey-49">
                  해당 메모와 관련된 질문이 없습니다...
                </p>
              ) : (
                <QuestionsList questions={questions} size="small" />
              )}
              <Link
                href={`/create/question?memoId=${memoId}`}
                className="absolute bottom-3 right-3 text-sm rounded-2xl text-soma-grey-60 border-[0.5px] border-soma-grey-49 px-2 py-1"
              >
                질문하기
              </Link>
            </div>
          )}
        </aside>
      )}
    </div>
  );
}
