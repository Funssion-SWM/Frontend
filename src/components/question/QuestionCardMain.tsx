import { QuestionCardSize } from '@/types/question';
import Link from 'next/link';

type Props = {
  questionId: number;
  questionTitle: string;
  questionDescription: string;
  size: QuestionCardSize;
};

export default function QuestionCardMain({
  questionId,
  questionTitle,
  questionDescription,
  size,
}: Props) {
  return (
    <Link href={`/questions/${questionId}`} className="my-3">
      <h2
        className={`${
          size === 'big' && 'sm:text-2xl'
        } text-lg text-soma-grey-70 font-extrabold line-clamp-1 hover:text-soma-blue-50 transition-all`}
      >
        {questionTitle}
      </h2>
      <p
        className={`${
          size === 'big' && 'sm:text-base'
        } text-sm text-soma-grey-60 line-clamp-2 mt-2 break-all hover:text-soma-blue-50 transition-all`}
      >
        {questionDescription}
      </p>
    </Link>
  );
}
