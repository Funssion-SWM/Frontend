'use client';

import { Question, QuestionOrderBy } from '@/types/question';
import CategoryBtn from '../shared/btn/CategoryBtn';
import QuestionsList from './QuestionsList';
import { useState } from 'react';
import { getQuestions } from '@/service/questions';

type Props = {
  questions: Question[];
};

export default function QuestionsContainer({ questions }: Props) {
  const [questionData, setQuestionData] = useState<Question[]>(questions);
  const [selectedOrderType, setSelectedOrderType] =
    useState<QuestionOrderBy>('NEW');

  const handleClick = async (orderBy: QuestionOrderBy) => {
    const memos = await getQuestions(orderBy);
    setQuestionData(memos);
    setSelectedOrderType(orderBy);
  };

  return (
    <div>
      <div className="flex gap-2 mb-3">
        <CategoryBtn
          text="New"
          onClick={() => handleClick('NEW')}
          size="big"
          isSelected={selectedOrderType === 'NEW'}
        />
        <CategoryBtn
          text="Hot"
          onClick={() => handleClick('HOT')}
          size="big"
          isSelected={selectedOrderType === 'HOT'}
        />
      </div>
      <QuestionsList questions={questionData} size="big" />
    </div>
  );
}
