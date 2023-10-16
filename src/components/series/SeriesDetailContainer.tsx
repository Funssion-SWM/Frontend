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
import { MemoInfo } from '@/types/series';

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
  memoInfoList: MemoInfo[];
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
  memoInfoList,
}: Props) {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [currentMemo, setCurrentMemo] = useState<Memo>(memo);
  const [currnetIsLike, setCurrentIsLike] = useState<boolean>(isLike);
  const [currentComments, setCurrentComments] = useState<Comment[]>(comments);
  const [currentQuestions, setCurrentQuestions] =
    useState<Question[]>(questions);

  useEffect(() => {
    getMemoById(memoInfoList[currentIdx].id).then((memo) => {
      setCurrentMemo(memo);
    });
    getIsLike('memos', memoInfoList[currentIdx].id).then((likedata) =>
      setCurrentIsLike(likedata.isLike)
    );
    getCommentsByPostTypeAndPostId('memo', memoInfoList[currentIdx].id).then(
      (comments) => setCurrentComments(comments)
    );
    getQuestionsByMemoId(memoInfoList[currentIdx].id).then((questions) =>
      setCurrentQuestions(questions)
    );
  }, [currentIdx]);

  return (
    <div className="flex flex-col">
      <ul className="flex gap-2 w-full overflow-x-auto my-2 py-2">
        {memoInfoList.map(({ title }, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIdx(idx)}
            className={`px-4 py-2 border-[1px] min-w-[128px] w-32
            rounded-3xl text-sm font-semibold hover:text-soma-blue-50 hover:border-soma-blue-50
            transition-all ${
              idx === currentIdx
                ? 'border-soma-blue-50 text-soma-blue-50'
                : 'text-soma-grey-60 border-soma-grey-40'
            }`}
          >
            <p className="line-clamp-1">{title}</p>
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
