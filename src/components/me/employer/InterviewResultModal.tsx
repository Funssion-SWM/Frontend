import { getInterviewResultByEmployeeId } from '@/service/employer';
import { InterviewResult } from '@/types/mini-interview';
import { useEffect, useState } from 'react';

type Props = {
  onClose: () => void;
  userId: number | null;
};

export default function InterviewResultModal({ onClose, userId }: Props) {
  const [interviewResult, setInterviewResult] = useState<InterviewResult>({
    question1: '',
    question2: '',
    question3: '',
    answer1: '',
    answer2: '',
    answer3: '',
  });
  const { question1, question2, question3, answer1, answer2, answer3 } =
    interviewResult;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userId === null) {
      console.error('userId가 null임');
      return;
    }
    getInterviewResultByEmployeeId(userId).then((res) => {
      setInterviewResult(res);
    });
    setIsLoading(false);
  }, []);

  return (
    <div className="fixed top-0">
      <Overay onClick={onClose} />
      <div
        className="fixed flex flex-col shadow-lg items-center justify-center bg-white rounded-2xl p-5  
      top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-5 w-[450px] h-[400px]"
      >
        {isLoading ? (
          'Loading...'
        ) : (
          <div className="flex flex-col gap-10 overscroll-y-auto">
            <div>
              <p className="font-semibold text-lg">Q1. {question1}</p>
              <p className="text-sm text-soma-grey-50">{answer1}</p>
            </div>
            <div>
              <p className="font-semibold text-lg">Q2. {question2}</p>
              <p className="text-sm text-soma-grey-50">{answer2}</p>
            </div>
            <div>
              <p className="font-semibold text-lg">Q3. {question3}</p>
              <p className="text-sm text-soma-grey-50">{answer3}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Overay({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="w-screen h-screen bg-white opacity-50"
      onClick={onClick}
    ></div>
  );
}
