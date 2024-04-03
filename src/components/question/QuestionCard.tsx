import { Question, QuestionCardSize } from '@/types/question';
import QuestionCardHeader from './QuestionCardHeader';
import QuestionCardMain from './QuestionCardMain';
import QuestionCardFooter from './QuestionCardFooter';
import { AiOutlineCheck } from '@react-icons/all-files/ai/AiOutlineCheck';
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
    rank,
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
            ? 'bg-soma-blue-40 text-soma-white font-medium'
            : 'bg-soma-grey-30 text-soma-grey-45'
        } absolute top-0 left-0 h-full w-14 text-[11px] ${
          size === 'big' && 'sm:w-20 sm:text-base'
        } flex flex-col justify-center items-center`}
      >
        <AiOutlineCheck
          className={`w-10 h-10 ${
            solved ? 'text-soma-green' : 'text-soma-grey-45'
          }`}
        />
        <p>solved</p>
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
          authorRank={rank}
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
