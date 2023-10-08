import { QuestionCardSize } from '@/types/question';
import TagsList from '../shared/TagsList';

type Props = {
  questionTags: string[];
  answersCount: number;
  size: QuestionCardSize;
};

export default function QuestionCardFooter({
  questionTags,
  answersCount,
  size,
}: Props) {
  return (
    <div
      className={`flex justify-between items-center ${
        size === 'small' && 'text-xs'
      }`}
    >
      <TagsList tags={questionTags} />
      <div className="text-xs text-soma-grey-50">{answersCount}개의 답변</div>
    </div>
  );
}
