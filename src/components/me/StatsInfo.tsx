import { Stats } from '@/types/rank';
import PieChart from '../shared/PieChart';

type Props = {
  userStats: Stats;
};

const countStyle = 'text-soma-blue-40 font-semibold';
const scoreStyle = 'text-soma-blue-40 font-semibold';

export default function StatsInfo({ userStats }: Props) {
  const {
    memoScoreAndCount,
    answerScoreAndCount,
    likeScoreAndCount,
    commentScoreAndCount,
    questionScoreAndCount,
    bestAnswerScoreAndCount,
    selectingAnswerScoreAndCount,
  } = userStats;

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center w-full gap-8">
      <PieChart userStats={userStats} />
      <ul className="text-center">
        <li>
          메모를 총{' '}
          <span className={countStyle}>{memoScoreAndCount.count}개</span>{' '}
          작성했고{' '}
          <span className={scoreStyle}>{memoScoreAndCount.score}점</span>을
          얻었습니다.
        </li>
        <li>
          질문을 총{' '}
          <span className={countStyle}>{questionScoreAndCount.count}개</span>{' '}
          작성했고{' '}
          <span className={scoreStyle}>{questionScoreAndCount.score}점</span>을
          얻었습니다.
        </li>
        <li>
          답변을 총{' '}
          <span className={countStyle}>{answerScoreAndCount.count}개</span>{' '}
          작성했고{' '}
          <span className={scoreStyle}>{answerScoreAndCount.score}점</span>을
          얻었습니다.
        </li>

        <li>
          답변을 총{' '}
          <span className={countStyle}>
            {selectingAnswerScoreAndCount.count}번
          </span>{' '}
          채택했고{' '}
          <span className={scoreStyle}>
            {selectingAnswerScoreAndCount.score}점
          </span>
          을 얻었습니다.
        </li>
        <li>
          답변이 총{' '}
          <span className={countStyle}>{bestAnswerScoreAndCount.count}번</span>{' '}
          채택되었고
          <span className={scoreStyle}>{bestAnswerScoreAndCount.score}점</span>
          을 얻었습니다.
        </li>
        <li>
          댓글을 총{' '}
          <span className={countStyle}>{commentScoreAndCount.count}개</span>{' '}
          작성했고{' '}
          <span className={scoreStyle}>{commentScoreAndCount.score}점</span>을
          얻었습니다.
        </li>
        <li>
          좋아요를 총{' '}
          <span className={countStyle}>{likeScoreAndCount.count}번</span> 받았고{' '}
          <span className={scoreStyle}>{likeScoreAndCount.score}점</span>을
          얻었습니다.
        </li>
      </ul>
    </div>
  );
}
