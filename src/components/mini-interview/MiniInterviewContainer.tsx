'use client';

import { useState } from 'react';
import MiniInterviewReadyContainer from './MiniInterviewReadyContainer';
import MiniInterviewQuestionContainer from './MiniInterviewQuestionContainer';
import MiniIterviewDoneContainer from './MiniIterviewDoneContainer';

type Props = {
  questions: string[];
  state: string;
};

export default function MiniInterviewContainer({ questions, state }: Props) {
  const [page, setPage] = useState(1);

  const next = () => {
    setPage((prePage) => prePage + 1);
  };

  return (
    <section>
      {
        {
          1: <MiniInterviewReadyContainer next={next} />,
          2: (
            <MiniInterviewQuestionContainer
              next={next}
              question={questions[0]}
              questionNum={1}
            />
          ),
          3: (
            <MiniInterviewQuestionContainer
              next={next}
              question={questions[1]}
              questionNum={2}
            />
          ),
          4: (
            <MiniInterviewQuestionContainer
              next={next}
              question={questions[2]}
              questionNum={3}
            />
          ),
          5: <MiniIterviewDoneContainer />,
        }[page]
      }
    </section>
  );
}
