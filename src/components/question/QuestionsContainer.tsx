'use client';

import { Question, QuestionOrderBy } from '@/types/question';
import QuestionsList from './QuestionsList';
import { useEffect, useRef, useState } from 'react';
import { getQuestions } from '@/service/questions';
import useObserver from '@/hooks/useObserver';
import { QUESTION_NUMBER_PER_PAGE_FOR_INFINITY_SCROLL } from '@/utils/const';
import CategoryLink from '../shared/CategoryLink';

type Props = {
  questions: Question[];
  type: QuestionOrderBy;
};

export default function QuestionsContainer({ questions, type }: Props) {
  const [questionData, setQuestionData] = useState<Question[]>(questions);
  const [pageNum, setPageNum] = useState(1);
  const [isEnd, setIsEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isInitialMount = useRef(true);

  const fetchQuestions = () => {
    if (isLoading || isEnd) return;
    setIsLoading(true);
    getQuestions(type, pageNum, QUESTION_NUMBER_PER_PAGE_FOR_INFINITY_SCROLL)
      .then((data) => {
        setIsLoading(false);
        if (!data.length) setIsEnd(true);
        else {
          setQuestionData([...questionData, ...data]);
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      fetchQuestions();
    }
  }, [pageNum]);

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    if (isEnd || isLoading) return;
    entry.isIntersecting && setPageNum(pageNum + 1);
  };

  const { setTarget } = useObserver({ onIntersect });

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
      <QuestionsList questions={questionData} size="big" />
      {isEnd ? <></> : <div ref={setTarget} />}
    </div>
  );
}
