'use client';

import { Question, QuestionOrderBy } from '@/types/question';
import QuestionsList from './QuestionsList';
import { getQuestions } from '@/service/questions';
import CategoryLink from '../shared/CategoryLink';
import { useInfinityScroll } from '@/hooks/useInfinityScroll';

type Props = {
  questions: Question[];
  type: QuestionOrderBy;
};

export default function QuestionsContainer({ questions, type }: Props) {
  const [data, isEnd, setTarget] = useInfinityScroll(questions, (pageNum) =>
    getQuestions(type, pageNum)
  );

  return (
    <div>
      <div className="flex gap-2 mb-3">
        <CategoryLink
          text="New"
          href="/questions/new"
          size="big"
          isSelected={type === 'NEW'}
        />
        <CategoryLink
          text="Hot"
          href="/questions/hot"
          size="big"
          isSelected={type === 'HOT'}
        />
      </div>
      <QuestionsList questions={data} size="big" />
      {isEnd ? <></> : <div ref={setTarget} />}
    </div>
  );
}
