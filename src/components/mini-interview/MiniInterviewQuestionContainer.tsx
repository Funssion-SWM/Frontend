import { postAnswer } from '@/service/mini-interview';
import { useEffect, useState } from 'react';

type Props = {
  question: string;
  questionNum: number;
  next: () => void;
  employerId: number;
};

const INITIAL_SECOND = 60;

export default function MiniInterviewQuestionContainer({
  question,
  questionNum,
  next,
  employerId,
}: Props) {
  const [answer, setAnswer] = useState('');
  const [second, setSecond] = useState(INITIAL_SECOND);

  const reset = () => {
    setSecond(INITIAL_SECOND);
    setAnswer('');
  };

  useEffect(() => {
    reset();
    const timer = setInterval(() => {
      setSecond((pre) => pre - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [question]);

  useEffect(() => {
    if (second === -1) {
      handleSubmit();
      return;
    }
  }, [second]);

  const handleSubmit = () => {
    switch (questionNum) {
      case 1:
        postAnswer(employerId, 1, answer);
        break;
      case 2:
        postAnswer(employerId, 2, answer);
        break;
      case 3:
        postAnswer(employerId, 3, answer);
        break;
      default:
        throw new Error('알맞은 question num이 아님');
    }

    next();
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      return (e.returnValue = '');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  });

  return (
    <div className="flex flex-col h-screen items-center justify-center gap-16">
      <p className="text-3xl font-semibold">
        Q{questionNum} : {question}
      </p>
      <textarea
        className="bg-soma-grey-20 sm:text-xl max-w-[1000px] w-full resize-none h-96 sm:h-60 break-all p-4 outline-none rounded-xl"
        value={answer}
        onChange={(e) => {
          setAnswer(e.target.value);
        }}
        placeholder="답변을 작성해주세요."
      ></textarea>

      <button
        className="bg-soma-blue-40 text-white px-4 py-2 text-xl sm:text-xl rounded-2xl hover:brightness-90 transition-all"
        onClick={handleSubmit}
      >
        완료
      </button>
      <div className="absolute top-3 right-3 sm:top-10 sm:right-10 bg-soma-blue-60 font-semibold text-white p-2 w-10 h-10 rounded-full text-center">
        {second}
      </div>
    </div>
  );
}
