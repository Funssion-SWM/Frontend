'use client';

import { useEffect, useState } from 'react';
import MiniInterviewReadyContainer from './MiniInterviewReadyContainer';
import MiniInterviewQuestionContainer from './MiniInterviewQuestionContainer';
import MiniIterviewDoneContainer from './MiniIterviewDoneContainer';
import { InterviewState } from '@/types/mini-interview';
import { startInterview } from '@/service/mini-interview';
import { RingLoader } from 'react-spinners';

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
  console.log(state)
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

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
    setIsLoading(false);
  }, []);

  const handleStart = () => {
    startInterview(employerId);
    next();
  };

  return isLoading ? (
    <div className="fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center bg-white opacity-90">
      <RingLoader className="self-center" color="#4992FF" />
      <div className="text-center font-medium text-soma-grey-60 text-sm my-5">
        Loading...
      </div>
    </div>
  ) : (
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
