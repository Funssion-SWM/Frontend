'use client';

import CommentsList from '@/components/memo/comment/CommentsList';
import { Comment } from '@/types/comment';
import MemoSidebarHeader from './MemoSidebarHeader';
import CommentForm from '@/components/memo/comment/CommentForm';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Question } from '@/types/question';
import QuestionsList from '../question/QuestionsList';
import { useRouter } from 'next/navigation';
import { notifyToast } from '@/utils/notify';
import { Rank } from '@/types/rank';
import { Memo } from '@/types/memo';
import MemosGrid from './MemosGrid';
import { ArrowRight } from '@/assets/svg';

type Props = {
  authorName: string;
  authorProfileImagePath: string;
  authorId: number;
  comments: Comment[];
  questions: Question[];
  recommendations: Memo[];
  memoId: number;
  userId: number;
  isFollowed: boolean;
  isMyMemo: boolean;
  isLogin: boolean;
  authorFollowingNum: number;
  authorFollowerNum: number;
  authorRank: Rank;
};

export default function MemoSideBar({
  authorName,
  authorProfileImagePath,
  authorId,
  comments,
  questions,
  recommendations,
  memoId,
  userId,
  isFollowed,
  isMyMemo,
  isLogin,
  authorFollowingNum,
  authorFollowerNum,
  authorRank,
}: Props) {
  const [isVisible, setIsVisible] = useState(true);
  const [currnetCategory, setCurrnetCategory] = useState<
    'comment' | 'question' | 'recommendation'
  >('comment');
  const router = useRouter();

  useEffect(() => {
    if (window.innerWidth < 640) {
      setIsVisible(false);
    }
  }, []);

  return (
    <div className="sticky flex top-24 max-h-for-fit-screen ">
      <button
        className={`flex z-10 absolute -left-10 sm:-left-3 justify-center items-center border-[1px] border-soma-grey-30 w-10 h-10 shadow-inner bg-white rounded-full self-center ${
          !isVisible && '-scale-x-100'
        }`}
        onClick={() => setIsVisible((pre) => !pre)}
      >
        <Image src={ArrowRight} alt="arrowBtn" />
      </button>
      {isVisible && (
        <aside
          className={`ml-4 absolute right-0 top-0 sm:static h-full bg-white flex flex-col rounded-2xl shadow-md w-[300px]`}
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
            authorFollowingNum={authorFollowingNum}
            authorFollowerNum={authorFollowerNum}
            authorRank={authorRank}
          />
          {currnetCategory === 'comment' &&
            (comments.length === 0 ? (
              <p className="flex items-center justify-center h-full text-sm text-soma-grey-49">
                작성된 댓글이 없습니다...
              </p>
            ) : (
              <CommentsList
                comments={comments}
                userId={userId}
                onClick={() => {}}
              />
            ))}
          {currnetCategory === 'comment' && (
            <div className="sticky bottom-0 px-2 py-3 bg-white rounded-b-2xl">
              <CommentForm
                postId={memoId}
                postType={'MEMO'}
                onClick={() => {}}
              />
            </div>
          )}
          {currnetCategory === 'question' && (
            <>
              {questions.length === 0 ? (
                <p className="flex items-center justify-center h-full text-sm text-soma-grey-49">
                  해당 메모와 관련된 질문이 없습니다...
                </p>
              ) : (
                <QuestionsList questions={questions} size="small" />
              )}
              <button
                className="absolute bg-white bottom-3 right-3 text-sm rounded-2xl text-soma-grey-60 border-[0.5px] border-soma-grey-49 px-2 py-1 hover:bg-soma-grey-25 transition-all"
                onClick={() => {
                  if (isLogin) {
                    router.push(`/create/question?memoId=${memoId}`);
                    return;
                  }
                  router.push('/login');
                  notifyToast('로그인을 해주세요.', 'error');
                }}
              >
                질문하기
              </button>
            </>
          )}
          {currnetCategory === 'recommendation' && (
            <div className="h-full p-2 overflow-y-auto">
              {recommendations.length === 0 ? (
                <p className="flex items-center justify-center h-full text-sm text-soma-grey-49">
                  해당 메모와 관련된 추천이 없습니다...
                </p>
              ) : (
                <MemosGrid memos={recommendations} colNum={1} />
              )}
            </div>
          )}
        </aside>
      )}
    </div>
  );
}
