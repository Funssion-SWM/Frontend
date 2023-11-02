'use client';

import { useEffect, useState } from 'react';
import MiniInterviewReadyContainer from './MiniInterviewReadyContainer';
import MiniInterviewQuestionContainer from './MiniInterviewQuestionContainer';
import MiniIterviewDoneContainer from './MiniIterviewDoneContainer';
import { InterviewState } from '@/types/mini-interview';
import { startInterview } from '@/service/mini-interview';

type Props = {
  questions: string[];
  state: InterviewState;
  employerId: number;
};

export default function MiniInterviewContainer({
  questions,
  state,
  employerId,
}: Props) {
  const [page, setPage] = useState(1);

  const next = () => {
    setPage((prePage) => prePage + 1);
  };

  useEffect(() => {
    switch (state) {
      case 'READY':
        break;
      case 'ING_Q1':
        setPage(2);
        break;
      case 'ING_Q2':
        setPage(3);
        break;
      case 'ING_Q3':
        setPage(4);
        break;
      case 'DONE':
        setPage(5);
        break;
      default:
        throw new Error('알맞은 상태 타입이 아님');
    }
  }, []);

  const handleStart = () => {
    startInterview(employerId);
    next();
  };

  return (
    <section>
      {
        {
          1: <MiniInterviewReadyContainer onStart={handleStart} />,
          2: (
            <MiniInterviewQuestionContainer
              next={next}
              question={questions[0]}
              questionNum={1}
              employerId={employerId}
            />
          ),
          3: (
            <MiniInterviewQuestionContainer
              next={next}
              question={questions[1]}
              questionNum={2}
              employerId={employerId}
            />
          ),
          4: (
            <MiniInterviewQuestionContainer
              next={next}
              question={questions[2]}
              questionNum={3}
              employerId={employerId}
            />
          ),
          5: <MiniIterviewDoneContainer />,
        }[page]
      }
    </section>
  );
}
