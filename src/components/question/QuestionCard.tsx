import { Question, QuestionCardSize } from '@/types/question';
import QuestionCardHeader from './QuestionCardHeader';
import QuestionCardMain from './QuestionCardMain';
import QuestionCardFooter from './QuestionCardFooter';
import { BsCheckLg } from 'react-icons/bs';
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
    solved,
  },
  size,
}: Props) {
  return (
    <article
      className={`flex relative ${
        size === 'big' ? 'border-y-[0.5px] p-4' : 'border-b-[0.5px] p-3'
      } border-soma-grey-45`}
    >
      <div
        className={`${
          solved
            ? 'bg-soma-blue-40 text-soma-green font-medium'
            : 'bg-soma-grey-30 text-soma-grey-49'
        } absolute top-0 left-0 h-full w-14 ${
          size === 'big' && 'sm:w-20'
        } flex flex-col justify-center items-center`}
      >
        {solved && <BsCheckLg className="w-10 h-10" />}
        {solved && <p>solved</p>}
      </div>
      <div
        className={`flex flex-col grow ml-14 ${size === 'big' && 'sm:ml-20'}`}
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
      </div>
    </article>
  );
}
