'use client';

import { ScoreDetailContext } from '@/context/ScoreDetailProvider';
import { Stats } from '@/types/rank';
import { useContext } from 'react';
import StatsInfo from './StatsInfo';
import CloseIcon from '../search/CloseIcon';
import { AiOutlineInfoCircle } from 'react-icons/ai';

type Props = {
  userStats: Stats;
};

export default function ScoreDetailModal({ userStats }: Props) {
  const { isOpen, closeScoreDetail } = useContext(ScoreDetailContext);

  return (
    isOpen && (
      <div className="fixed top-0 z-10">
        <Overay onClick={() => closeScoreDetail()} />
        <div
          className="fixed flex flex-col shadow-lg items-center bg-white rounded-2xl p-4 sm:p-10 
top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:w-[750px]"
        >
          <div className="flex items-center">
            <p className="sm:text-2xl font-semibold">Score Detail</p>
            <div className="group mx-2 relative">
              <AiOutlineInfoCircle />
              <div className="absolute top-0 right-0 w-[160px] p-3 bg-white opacity-0 pointer-events-none transition-all group-hover:opacity-100 group-hover:pointer-events-auto rounded-2xl shadow-lg">
                <ul className="flex flex-col text-sm items-center">
                  <li>메모 작성 : 50</li>
                  <li>질문 작성 : 30</li>
                  <li>답변 작성 : 20</li>
                  <li>채택하기 : 20</li>
                  <li>채택되기 : 80</li>
                  <li>댓글 작성 : 5</li>
                  <li>좋아요 받기 : 10</li>
                  <li>하루 최대 점수 : 200</li>
                </ul>
              </div>
            </div>
          </div>
          <StatsInfo userStats={userStats} />
          <div className="text-xs text-soma-grey-49">
            해당 기록은 점수가 기록된 경우에만 측정됩니다. 일일 최대 점수를 넘어
            기록되지 않은 로그는 보이지 않습니다.
          </div>
          <CloseIcon
            size={24}
            onClick={() => closeScoreDetail()}
            extraClass={`absolute top-3 right-3`}
          />
        </div>
      </div>
    )
  );
}

function Overay({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="w-screen h-screen bg-white opacity-50 fixed top-0 left-0"
      onClick={onClick}
    ></div>
  );
}
