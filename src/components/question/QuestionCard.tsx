import { Question, QuestionCardSize } from '@/types/question';
import QuestionCardHeader from './QuestionCardHeader';
import QuestionCardMain from './QuestionCardMain';
import QuestionCardFooter from './QuestionCardFooter';

type Props = {
  question: Question;
  size: QuestionCardSize;
};

export default function QuestionCard({
  question: {
    title,
    description,
    createdDate,
    tags,
    id,
    likes,
    authorName,
    authorId,
    authorImagePath,
    answersCount,
  },
  size,
}: Props) {
  return (
    <article
      className={`flex flex-col ${
        size === 'big' ? 'border-t-[0.5px] p-4' : 'border-b-[0.5px] p-3'
      } border-soma-grey-49 `}
    >
      <QuestionCardHeader
        createdDate={createdDate}
        authorName={authorName}
        likeNum={likes}
        imagePath={authorImagePath}
        authorId={authorId}
        size={size}
      />
      <QuestionCardMain
        questionId={id}
        questionTitle={title}
        questionDescription={description}
        size={size}
      />
      <QuestionCardFooter
        questionTags={tags}
        answersCount={answersCount}
        size={size}
      />
    </article>
  );
}
