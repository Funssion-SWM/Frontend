import { Answer } from '@/types/answer';
import AnswerCard from './AnswerCard';

type Props = {
  answers: Answer[];
  userId: number;
};

export default function AnswersList({ answers, userId }: Props) {
  return (
    <ul className="flex flex-col gap-2">
      {answers.map((answer) => (
        <li key={answer.id}>
          <AnswerCard answer={answer} userId={userId} />
        </li>
      ))}
    </ul>
  );
}
