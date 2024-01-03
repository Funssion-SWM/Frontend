'use client';

import { useInfinityScroll } from '@/hooks/useInfinityScroll';
import {
  getAnswerdQuestionsByUserId,
  getLikedQuestionsByUserId,
  getQuestionsByUserId,
} from '@/service/me';
import { Question } from '@/types/question';
import QuestionsList from '@/components/question/QuestionsList';

type Props = {
  questions: Question[];
  userId: number;
  bigCategory: 'post' | 'like' | 'answered';
};

export default function MeQuestionsContainer({
  questions,
  userId,
  bigCategory,
}: Props) {
  const [data, isEnd, setTarget] = useInfinityScroll(questions, (pageNum) => {
    switch (bigCategory) {
      case 'post':
        return getQuestionsByUserId(userId, pageNum);
      case 'like':
        return getLikedQuestionsByUserId(userId, pageNum);
      case 'answered':
        return getAnswerdQuestionsByUserId(userId, pageNum);
    }
  });

  return (
    <>
      <QuestionsList questions={data} size="big" />
      {isEnd ? <></> : <div ref={setTarget} />}
    </>
  );
}
