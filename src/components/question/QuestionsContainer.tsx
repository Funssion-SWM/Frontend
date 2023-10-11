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
  const [selectedOrderType, setSelectedOrderType] = useState<
    QuestionOrderBy | 'EVENT'
  >('NEW');

  const handleClick = async (orderBy: QuestionOrderBy | 'EVENT') => {
    if (orderBy === 'EVENT') {
      const questions = (await getQuestions('NEW')).filter(
        (question) =>
          question.authorId === 1 ||
          question.authorId === 31 ||
          question.authorId === 32
      );
      setQuestionData(questions);
    } else {
      const questions = await getQuestions(orderBy);
      setQuestionData(questions);
    }
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
        <CategoryBtn
          text="Event"
          onClick={() => handleClick('EVENT')}
          size="big"
          isSelected={selectedOrderType === 'EVENT'}
        />
      </div>
      <QuestionsList questions={questionData} size="big" />
    </div>
  );
}
