'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import MemoViewer from '../memo/MemoViewer';
import MemoSideBar from '../memo/MemoSideBar';
import { getMemoById } from '@/service/memos';
import { getCommentsByPostTypeAndPostId } from '@/service/comments';
import { getQuestionsByMemoId } from '@/service/questions';
import { Question } from '@/types/question';
import { Memo } from '@/types/memo';
import { Comment } from '@/types/comment';
import { MemoInfo } from '@/types/series';
import { useDetectOutsideClick } from '@/hooks/useDeleteOutsideClick';
import LikeBox from '../shared/LikeBox';
import Image from 'next/image';
import more from '@/assets/icons/more.svg';
import { useRouter } from 'next/navigation';
import { ModalContext } from '@/context/ModalProvider';
import { deleteSeries } from '@/service/series';
import { notifyToast } from '@/service/notify';
import arrowIcon from '@/assets/icons/arrow_icon.svg';

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
  seriesLikeNum: number;
  seriesId: number;
  isMySeries: boolean;
  seriesTitle: string;
};

export default function SeriesDetailContainer({
  memo: { authorId, authorName, authorProfileImagePath, isMine, authorRank },
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
  seriesLikeNum,
  seriesId,
  isMySeries,
  seriesTitle,
}: Props) {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [currentMemo, setCurrentMemo] = useState<Memo>(memo);
  const [currentComments, setCurrentComments] = useState<Comment[]>(comments);
  const [currentQuestions, setCurrentQuestions] =
    useState<Question[]>(questions);
  const dropdownRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const router = useRouter();
  const { open } = useContext(ModalContext);

  useEffect(() => {
    getMemoById(memoInfoList[currentIdx].id).then((memo) => {
      setCurrentMemo(memo);
    });
    getQuestionsByMemoId(memoInfoList[currentIdx].id).then((questions) =>
      setCurrentQuestions(questions)
    );
  }, [currentIdx]);

  useEffect(() => {
    getCommentsByPostTypeAndPostId('memo', memoInfoList[currentIdx].id).then(
      (comments) => setCurrentComments(comments)
    );
  }, [currentIdx, comments]);

  const handleDelete = () => {
    deleteSeries(seriesId).then((res) => {
      if (res?.code) {
        notifyToast(res.message, 'error');
        return;
      }
      notifyToast('성공적으로 시리즈가 삭제되었습니다.', 'success');
      router.push('/series');
      router.refresh();
    });
  };

  const handleLeftBtnClick = () => {
    if (currentIdx === 0) return;
    setCurrentIdx((preIdx) => preIdx - 1);
    window.scrollTo(0, 0);
  };

  const handleRightBtnClick = () => {
    if (currentIdx === memoInfoList.length - 1) return;
    setCurrentIdx((preIdx) => preIdx + 1);
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between bg-soma-grey-20 p-4 rounded-lg">
        <h1 className="text-xl sm:text-3xl font-semibold">
          <span className="text-soma-blue-50">Series </span>
          {seriesTitle}
        </h1>
        <nav className="relative flex items-center z-0" ref={dropdownRef}>
          <LikeBox
            likeNum={seriesLikeNum}
            postId={seriesId}
            isLike={isLike}
            postType="series"
            iconSize={20}
          />
          {isMySeries && (
            <div className="flex ml-2">
              <button onClick={() => setIsActive((pre) => !pre)}>
                <Image src={more} alt="more" />
              </button>
              <nav
                className={`absolute top-6 right-0 bg-white flex flex-col gap-1 rounded-lg shadow-inner w-20 ${
                  isActive ? 'visible' : 'invisible'
                }`}
              >
                <button
                  className="hover:bg-gray-200 p-2 rounded-t-lg"
                  onClick={() => {
                    setIsActive(false);
                    router.push(`/create/series/?id=${seriesId}`);
                    router.refresh();
                  }}
                >
                  수정하기
                </button>
                <button
                  className="hover:bg-gray-200 p-2 rounded-b-lg"
                  onClick={() => {
                    setIsActive(false);
                    open('시리즈를 삭제하시겠습니까?', () => {
                      handleDelete();
                    });
                  }}
                >
                  삭제하기
                </button>
              </nav>
            </div>
          )}
        </nav>
      </div>
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
            <p className="line-clamp-1 break-all">{title}</p>
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
          isLike={false}
          isMyMemo={isMine}
          createdDate={currentMemo.createdDate}
          type="series"
          seriesId={seriesId}
          seriesTitle={seriesTitle}
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
          authorRank={authorRank}
        />
      </div>
      <div className="flex justify-center items-center my-5">
        <button
          className={`rounded-full border-2 p-1 border-soma-grey-30 rotate-180 ${
            currentIdx === 0 ? 'opacity-40 pointer-events-none' : ''
          }`}
          onClick={handleLeftBtnClick}
        >
          <Image src={arrowIcon} alt="arrowIcon" />
        </button>
        <div className="text-soma-grey-48 mx-5">
          <span className="text-soma-blue-50">Series {currentIdx + 1}</span> /{' '}
          {memoInfoList.length}
        </div>
        <button
          className={`rounded-full border-2 p-1 border-soma-grey-30 ${
            currentIdx === memoInfoList.length - 1
              ? 'opacity-40 pointer-events-none'
              : ''
          }`}
          onClick={handleRightBtnClick}
        >
          <Image src={arrowIcon} alt="arrowIcon" />
        </button>
      </div>
    </div>
  );
}
