import Image from 'next/image';
import thumbsUpActive from '@/assets/icons/thumb_up_active.svg';
import thumbsUpInactive from '@/assets/icons/thumb_up_inactive.svg';
import thumbsDownActive from '@/assets/icons/thumb_down_active.svg';
import thumbsDownInactive from '@/assets/icons/thumb_down_incative.svg';
import { useState } from 'react';
import RecommentContainer from '../memo/recomment/RecommentContainer';
import AnswerCommentContainer from './AnswerCommentContainer';

type Props = {
  repliesCount: number;
  answerId: number;
  authorId: number;
  userId: number;
};

export default function AnswerCardFooter({
  repliesCount,
  answerId,
  authorId,
  userId,
}: Props) {
  const [isCommentBtnClicked, setIsCommentBtnClicked] =
    useState<boolean>(false);

  return (
    <div>
      <div className="flex justify-between items-center">
        <button
          className="text-soma-blue-40 font-semibold"
          onClick={() => setIsCommentBtnClicked((pre) => !pre)}
        >
          {isCommentBtnClicked
            ? '댓글 닫기'
            : repliesCount === 0
            ? '댓글 작성'
            : `${repliesCount}개의 댓글`}
        </button>
        <div className="flex">
          <div className="flex">
            <Image src={thumbsUpActive} alt="thumbsUpActive" />

            {/* <Image src={thumbsUpInactive} alt="thumbsUpInactive" /> */}
            <span>10</span>
          </div>
          <div className="flex">
            <Image src={thumbsDownActive} alt="thumbsDownActive" />
            {/* <Image src={thumbsDownInactive} alt="thumbsDownInactive" /> */}
            <span>10</span>
          </div>
        </div>
      </div>
      {isCommentBtnClicked && (
        <AnswerCommentContainer
          answerId={answerId}
          authorId={authorId}
          userId={userId}
        />
      )}
    </div>
  );
}
