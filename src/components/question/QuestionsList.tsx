import { Question, QuestionCardSize } from '@/types/question';
import QuestionCard from './QuestionCard';

type Props = {
  questions: Question[];
  size: QuestionCardSize;
};

export default function QuestionsList({ questions, size }: Props) {
  return (
    <ul className="flex flex-col gap-2">
      {questions.map((question) => (
        <li key={question.id}>
          <QuestionCard question={question} size={size} />
        </li>
      ))}
    </ul>
  );
}
