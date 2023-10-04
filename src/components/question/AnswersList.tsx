import { Answer } from '@/types/answer';
import AnswerCard from './AnswerCard';

type Props = {
  answers: Answer[];
};

export default function AnswersList({ answers }: Props) {
  return (
    <ul className="flex flex-col gap-2">
      {answers.map((answer) => (
        <li key={answer.id}>
          <AnswerCard answer={answer} />
        </li>
      ))}
    </ul>
  );
}
