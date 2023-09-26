'use client';

import { Question } from '@/types/question';
import CategoryBtn from '../shared/btn/CategoryBtn';
import QuestionsList from './QuestionsList';

type Props = {
  questions: Question[];
};

export default function QuestionsContainer({ questions }: Props) {
  return (
    <div>
      <div className="flex gap-2 my-2 ml-1 sm:mb-5">
        <CategoryBtn text="New✨" onClick={() => {}} isSelected={true} />
        <CategoryBtn text="Hot🔥" onClick={() => {}} isSelected={false} />
      </div>
      <QuestionsList questions={questions} />
      {/* <MemosGrid memos={memoData} colNum={4} /> */}
    </div>
  );
}
