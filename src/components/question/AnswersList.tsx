import { Answer } from '@/types/answer';
import AnswerCard from './AnswerCard';

type Props = {
  answers: Answer[];
  userId: number;
  isMyQuestion: boolean;
  isSolved: boolean;
};

export default function AnswersList({
  answers,
  userId,
  isMyQuestion,
  isSolved,
}: Props) {
  return (
    <ul className="flex flex-col gap-2">
      {answers.map((answer) => (
        <li key={answer.id}>
          <AnswerCard
            answer={answer}
            userId={userId}
            isMyQuestion={isMyQuestion}
            isSolved={isSolved}
          />
        </li>
      ))}
    </ul>
  );
}
