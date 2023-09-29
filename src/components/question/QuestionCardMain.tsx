import Link from 'next/link';

type Props = {
  questionId: number;
  questionTitle: string;
  questionDescription: string;
};

export default function QuestionCardMain({
  questionId,
  questionTitle,
  questionDescription,
}: Props) {
  return (
    <Link href={`/questions/${questionId}`} className="my-2">
      <h2 className="text-2xl text-soma-grey-70 font-extrabold line-clamp-1">
        {questionTitle}
      </h2>
      <p className="text-soma-grey-60 line-clamp-2 mt-1 break-all">
        {questionDescription}
      </p>
    </Link>
  );
}
