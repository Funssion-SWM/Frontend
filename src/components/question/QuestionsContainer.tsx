'use client';

import { Question, QuestionOrderBy } from '@/types/question';
import CategoryBtn from '../shared/btn/CategoryBtn';
import QuestionsList from './QuestionsList';
import { useEffect, useRef, useState } from 'react';
import { getQuestions } from '@/service/questions';
import useObserver from '@/hooks/useObserver';
import { QUESTION_NUMBER_PER_PAGE_FOR_INFINITY_SCROLL } from '@/utils/const';

type Props = {
  questions: Question[];
};

export default function QuestionsContainer({ questions }: Props) {
  const [questionData, setQuestionData] = useState<Question[]>(questions);
  const [selectedOrderType, setSelectedOrderType] =
    useState<QuestionOrderBy>('NEW');
  const [pageNum, setPageNum] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isInitialMount = useRef(true);

  const handleClick = async (orderBy: QuestionOrderBy) => {
    if (orderBy === selectedOrderType) return;
    setIsLoading(true);
    setIsEnd(false);
    setPageNum(0);
    const questions = await getQuestions(
      orderBy,
      0,
      QUESTION_NUMBER_PER_PAGE_FOR_INFINITY_SCROLL
    );
    setIsLoading(false);
    setQuestionData(questions);
    setSelectedOrderType(orderBy);
  };

  const fetchQuestions = () => {
    if (isLoading || isEnd) return;
    setIsLoading(true);
    getQuestions(
      selectedOrderType,
      pageNum,
      QUESTION_NUMBER_PER_PAGE_FOR_INFINITY_SCROLL
    )
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
        {/* <CategoryBtn
          text="Event"
          onClick={() => handleClick('EVENT')}
          size="big"
          isSelected={selectedOrderType === 'EVENT'}
        /> */}
      </div>
      <QuestionsList questions={questionData} size="big" />
      {isEnd ? <></> : <div ref={setTarget} />}
    </div>
  );
}
