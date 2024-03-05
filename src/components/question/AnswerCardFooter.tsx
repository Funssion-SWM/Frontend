import Image from 'next/image';
import { useState } from 'react';
import AnswerCommentContainer from './AnswerCommentContainer';
import { dislike, like, undislike, unlike } from '@/service/like';
import { notifyToast } from '@/utils/notify';
import { azertMono } from '@/styles/fonts';
import { useRouter } from 'next/navigation';
import {
  ThumbDownActive,
  ThumbDownInactive,
  ThumbUpActive,
  ThumbUpInactive,
} from '@/assets/svg';

type Props = {
  repliesCount: number;
  answerId: number;
  authorId: number;
  userId: number;
  likeNum: number;
  dislikeNum: number;
  isLike: boolean;
  isDislike: boolean;
};

export default function AnswerCardFooter({
  repliesCount,
  answerId,
  authorId,
  userId,
  likeNum,
  dislikeNum,
  isLike,
  isDislike,
}: Props) {
  const [isCommentBtnClicked, setIsCommentBtnClicked] =
    useState<boolean>(false);
  const [currentIsLike, setCurrentIsLike] = useState<boolean>(isLike);
  const [currentIsDislike, setCurrentIsDislike] = useState<boolean>(isDislike);
  const [currentLikeNum, setCurrentLikeNum] = useState<number>(likeNum);
  const [currentDislikeNum, setCurrentDislikeNum] =
    useState<number>(dislikeNum);
  const router = useRouter();

  const handleThumbUpClick = () => {
    if (currentIsLike) {
      unlike('answers', answerId).then((res) => {
        if (res?.code) {
          if (res.code === 401) router.push('/login');
          notifyToast(res.message, 'error');
          return;
        }
        setCurrentIsLike(false);
        setCurrentLikeNum((pre) => pre - 1);
      });
    } else {
      if (currentIsDislike) {
        undislike('answers', answerId).then((res) => {
          if (res?.code) {
            if (res.code === 401) router.push('/login');
            notifyToast(res.message, 'error');
            return;
          }
          setCurrentIsDislike(false);
          setCurrentDislikeNum((pre) => pre - 1);
          like('answers', answerId).then((res) => {
            if (res?.code) {
              if (res.code === 401) router.push('/login');
              notifyToast(res.message, 'error');
              return;
            }
            setCurrentIsLike(true);
            setCurrentLikeNum((pre) => pre + 1);
          });
        });
      } else {
        like('answers', answerId).then((res) => {
          if (res?.code) {
            if (res.code === 401) router.push('/login');
            notifyToast(res.message, 'error');
            return;
          }
          setCurrentIsLike(true);
          setCurrentLikeNum((pre) => pre + 1);
        });
      }
    }
  };

  const handleThumbDownClick = () => {
    if (currentIsDislike) {
      undislike('answers', answerId).then((res) => {
        if (res?.code) {
          if (res.code === 401) router.push('/login');
          notifyToast(res.message, 'error');
          return;
        }
        setCurrentIsDislike(false);
        setCurrentDislikeNum((pre) => pre - 1);
      });
    } else {
      if (currentIsLike) {
        unlike('answers', answerId).then((res) => {
          if (res?.code) {
            if (res.code === 401) router.push('/login');
            notifyToast(res.message, 'error');
            return;
          }
          setCurrentIsLike(false);
          setCurrentLikeNum((pre) => pre - 1);
          dislike('answers', answerId).then((res) => {
            if (res?.code) {
              if (res.code === 401) router.push('/login');
              notifyToast(res.message, 'error');
              return;
            }
            setCurrentIsDislike(true);
            setCurrentDislikeNum((pre) => pre + 1);
          });
        });
      } else {
        dislike('answers', answerId).then((res) => {
          if (res?.code) {
            if (res.code === 401) router.push('/login');
            notifyToast(res.message, 'error');
            return;
          }
          setCurrentIsDislike(true);
          setCurrentDislikeNum((pre) => pre + 1);
        });
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <button
          className="text-sm font-semibold text-soma-blue-40"
          onClick={() => setIsCommentBtnClicked((pre) => !pre)}
        >
          {isCommentBtnClicked
            ? '댓글 닫기'
            : repliesCount === 0
            ? '댓글 작성'
            : `${repliesCount}개의 댓글`}
        </button>
        <div className={`flex gap-3 ${azertMono.className} text-soma-grey-60`}>
          <div className="flex">
            <button onClick={handleThumbUpClick}>
              {currentIsLike ? (
                <Image src={ThumbUpActive} alt="thumb-up-active" />
              ) : (
                <Image src={ThumbUpInactive} alt="thumb-up-inactive" />
              )}
            </button>
            <span>{currentLikeNum}</span>
          </div>
          <div className="flex">
            <button onClick={handleThumbDownClick}>
              {currentIsDislike ? (
                <Image src={ThumbDownActive} alt="thumb-down-active" />
              ) : (
                <Image src={ThumbDownInactive} alt="thumb-down-inactive" />
              )}
            </button>
            <span>{currentDislikeNum}</span>
          </div>
        </div>
      </div>
      {isCommentBtnClicked && (
        <AnswerCommentContainer answerId={answerId} userId={userId} />
      )}
    </div>
  );
}
