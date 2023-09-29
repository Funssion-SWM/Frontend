import { Question } from '@/types/question';
import QuestionCard from './QuestionCard';

type Props = {
  questions: Question[];
};

export default function QuestionsList({ questions }: Props) {
  return (
    <ul className="flex flex-col gap-2">
      {questions.map((question) => (
        <li key={question.id}>
          <QuestionCard question={question} />
        </li>
      ))}
    </ul>
  );
}
