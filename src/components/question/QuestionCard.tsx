import { Question } from '@/types/question';
import TagsList from '../shared/TagsList';
import Image from 'next/image';
import basicProfileImg from '@/assets/profile.svg';
import Link from 'next/link';
import fillHeart from '@/assets/icons/heart_fill.svg';

type Props = {
  question: Question;
};

export default function QuestionCard({
  question: {
    questionTitle,
    questionDescription,
    createdDate,
    questionTags,
    questionId,
  },
}: Props) {
  return (
    <article className="flex flex-col p-4 border-t-[0.5px] border-soma-grey-49 ">
      <div className="flex justify-between">
        <div className="flex items-center">
          <Link href={`/me/1`}>
            <Image
              src={basicProfileImg}
              alt="profileImg"
              width={36}
              height={36}
              className="rounded-full w-9 h-9 object-cover"
            />
          </Link>
          <div className="ml-2">
            <h4 className="text-soma-grey-60 font-medium">dongree</h4>
            <p className="text-xs text-soma-grey-49">{createdDate}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Image src={fillHeart} alt="fill_heart" width={16} height={16} />
          <p className="text-soma-grey-49 text-xs w-5 text-center ml-0.5">12</p>
        </div>
      </div>
      <Link href={`/questions/${questionId}`} className="my-2">
        <h2 className="text-2xl text-soma-grey-70 font-extrabold line-clamp-1">
          {questionTitle}
        </h2>
        <p className="text-soma-grey-60 line-clamp-2 mt-1 break-all">
          {questionDescription}
        </p>
      </Link>
      <div className="flex justify-between">
        <TagsList tags={questionTags} />
        <div className="text-sm">답글 개수 7개</div>
      </div>
    </article>
  );
}
