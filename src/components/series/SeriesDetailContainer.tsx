'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import MemoViewer from '../memo/MemoViewer';
import MemoSideBar from '../memo/MemoSideBar';
import { getMemoById, getMemoRecommendationsById } from '@/service/memos';
import { getCommentsByPostTypeAndPostId } from '@/service/comments';
import { getQuestionsByMemoId } from '@/service/questions';
import { Question } from '@/types/question';
import { Memo } from '@/types/memo';
import { Comment } from '@/types/comment';
import { MemoInfo } from '@/types/series';
import { useDetectOutsideClick } from '@/hooks/useDeleteOutsideClick';
import LikeBox from '../shared/LikeBox';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ModalContext } from '@/context/ModalProvider';
import { deleteSeries } from '@/service/series';
import { notifyToast } from '@/utils/notify';
import arrowIcon from '@/assets/icons/arrow_icon.svg';
import MoreOptions from '../shared/MoreOptions';

type Props = {
  memo: Memo;
  comments: Comment[];
  questions: Question[];
  recommendation: Memo[];
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
  recommendation,
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
  const [currentRecommendations, setCurrentRecommendations] =
    useState<Memo[]>(recommendation);
  const dropdownRef = useRef<HTMLElement>(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const router = useRouter();
  const { open } = useContext(ModalContext);

  const horizontalNavRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    getMemoById(memoInfoList[currentIdx].id).then((memo) => {
      setCurrentMemo(memo);
    });
    getQuestionsByMemoId(memoInfoList[currentIdx].id).then((questions) =>
      setCurrentQuestions(questions)
    );
    getMemoRecommendationsById(memoInfoList[currentIdx].id).then(
      (recommendations) => setCurrentRecommendations(recommendations)
    );
  }, [currentIdx]);

  useEffect(() => {
    getCommentsByPostTypeAndPostId('memo', memoInfoList[currentIdx].id).then(
      (comments) => setCurrentComments(comments)
    );
  }, [currentIdx, comments]);

  const handleDelete = () => {
    setIsActive(false);
    open('시리즈를 삭제하시겠습니까?', () => {
      deleteSeries(seriesId).then((res) => {
        if (res?.code) {
          notifyToast(res.message, 'error');
          return;
        }
        notifyToast('성공적으로 시리즈가 삭제되었습니다.', 'success');
        router.push('/series');
        router.refresh();
      });
    });
  };

  const handleUpdateBtnClick = () => {
    setIsActive(false);
    router.push(`/create/series/?id=${seriesId}`);
    router.refresh();
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
      <div className="flex items-center justify-between p-4 rounded-lg bg-soma-grey-20">
        <h1 className="text-xl font-semibold sm:text-3xl">
          <span className="text-soma-blue-50">Series </span>
          {seriesTitle}
        </h1>
        <nav className="relative z-0 flex items-center" ref={dropdownRef}>
          <LikeBox
            likeNum={seriesLikeNum}
            postId={seriesId}
            isLike={isLike}
            postType="series"
            iconSize={20}
          />
          {isMySeries && (
            <MoreOptions
              isActive={isActive}
              onClick={() => setIsActive((pre) => !pre)}
              onUpdateBtnClick={handleUpdateBtnClick}
              onDeleteBtnClick={handleDelete}
            />
          )}
        </nav>
      </div>
      <ul
        className="flex gap-2 py-2 my-2 overflow-x-auto scroll-smooth"
        ref={horizontalNavRef}
      >
        {memoInfoList.map(({ title }, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              setCurrentIdx(idx);
              if (horizontalNavRef.current) {
                horizontalNavRef.current.scrollLeft =
                  e.currentTarget.offsetLeft -
                  horizontalNavRef.current?.clientWidth / 2 +
                  e.currentTarget.clientWidth / 2;
              }
            }}
            className={`px-4 py-2 border-[1px] min-w-[130px] w-32
            rounded-3xl text-sm font-semibold hover:text-soma-blue-50 hover:border-soma-blue-50
            transition-all ${
              idx === currentIdx
                ? 'border-soma-blue-50 text-soma-blue-50'
                : 'text-soma-grey-60 border-soma-grey-40'
            }`}
          >
            <p className="break-all line-clamp-1">{title}</p>
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
          isLogin={isLogin}
        />
        <MemoSideBar
          authorName={authorName}
          authorProfileImagePath={authorProfileImagePath}
          authorId={authorId}
          comments={currentComments}
          questions={currentQuestions}
          recommendations={currentRecommendations}
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
      <div className="flex items-center justify-center my-5">
        <button
          className={`rounded-full border-2 p-1 border-soma-grey-30 rotate-180 ${
            currentIdx === 0 ? 'opacity-40 pointer-events-none' : ''
          }`}
          onClick={handleLeftBtnClick}
        >
          <Image src={arrowIcon} alt="arrowIcon" />
        </button>
        <div className="mx-5 text-soma-grey-48">
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
