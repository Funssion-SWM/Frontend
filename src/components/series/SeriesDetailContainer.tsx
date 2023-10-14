'use client';

import { useEffect, useState } from 'react';
import MemoViewer from '../memo/MemoViewer';
import MemoSideBar from '../memo/MemoSideBar';
import { getMemoById } from '@/service/memos';
import { getIsLike } from '@/service/like';
import { getCommentsByPostTypeAndPostId } from '@/service/comments';
import { getQuestionsByMemoId } from '@/service/questions';
import { Question } from '@/types/question';
import { Memo } from '@/types/memo';
import { Comment } from '@/types/comment';

type Props = {
  memo: Memo;
  comments: Comment[];
  questions: Question[];
  isLike: boolean;
  userId: number;
  isLogin: boolean;
  isFollowed: boolean;
  authorFollowingNum: number;
  authorFollowerNum: number;
  memoIds: number[];
};

export default function SeriesDetailContainer({
  memo: { authorId, authorName, authorProfileImagePath, isMine },
  memo,
  comments,
  questions,
  isLike,
  userId,
  isLogin,
  isFollowed,
  authorFollowingNum,
  authorFollowerNum,
  memoIds,
}: Props) {
  const [titles, setTitles] = useState(['test1', 'test2', 'test3', 'test4']);

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [currentMemo, setCurrentMemo] = useState<Memo>(memo);
  const [currnetIsLike, setCurrentIsLike] = useState<boolean>(isLike);
  const [currentComments, setCurrentComments] = useState<Comment[]>(comments);
  const [currentQuestions, setCurrentQuestions] =
    useState<Question[]>(questions);

  useEffect(() => {
    getMemoById(memoIds[currentIdx]).then((memo) => {
      setCurrentMemo(memo);
    });
    getIsLike('memos', memoIds[currentIdx]).then((likedata) =>
      setCurrentIsLike(likedata.isLike)
    );
    getCommentsByPostTypeAndPostId('memo', memoIds[currentIdx]).then(
      (comments) => setCurrentComments(comments)
    );
    getQuestionsByMemoId(memoIds[currentIdx]).then((questions) =>
      setCurrentQuestions(questions)
    );
  }, [currentIdx]);

  return (
    <div>
      <ul className="flex gap-2">
        {titles.map((title, idx) => (
          <button
            key={idx}
            className="bg-soma-blue-40 text-white rounded-2xl px-2 py-1"
            onClick={() => setCurrentIdx(idx)}
          >
            {title}
          </button>
        ))}
      </ul>
      <div className="flex w-full ">
        <MemoViewer
          title={currentMemo.memoTitle}
          content={JSON.parse(currentMemo.memoText)}
          color={currentMemo.memoColor}
          memoTags={currentMemo.memoTags}
          memoId={currentMemo.memoId}
          likes={currentMemo.likes}
          isLike={currnetIsLike}
          isMyMemo={isMine}
          createdDate={currentMemo.createdDate}
        />
        <MemoSideBar
          authorName={authorName}
          authorProfileImagePath={authorProfileImagePath}
          authorId={authorId}
          comments={currentComments}
          questions={currentQuestions}
          memoId={currentMemo.memoId}
          userId={userId}
          isFollowed={isFollowed}
          isMyMemo={isMine}
          isLogin={isLogin}
          authorFollowingNum={authorFollowingNum}
          authorFollowerNum={authorFollowerNum}
        />
      </div>
    </div>
  );
}
