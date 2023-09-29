import { Question } from '@/types/question';
import QuestionCardHeader from './QuestionCardHeader';
import QuestionCardMain from './QuestionCardMain';
import QuestionCardFooter from './QuestionCardFooter';

type Props = {
  question: Question;
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
}: Props) {
  return (
    <article className="flex flex-col p-4 border-t-[0.5px] border-soma-grey-49 ">
      <QuestionCardHeader
        createdDate={createdDate}
        authorName={authorName}
        likeNum={likes}
        imagePath={authorImagePath}
        authorId={authorId}
      />
      <QuestionCardMain
        questionId={id}
        questionTitle={title}
        questionDescription={description}
      />
      <QuestionCardFooter questionTags={tags} answersCount={answersCount} />
    </article>
  );
}
