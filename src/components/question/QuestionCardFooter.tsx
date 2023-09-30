import TagsList from '../shared/TagsList';

type Props = {
  questionTags: string[];
  answersCount: number;
};

export default function QuestionCardFooter({
  questionTags,
  answersCount,
}: Props) {
  return (
    <div className="flex justify-between items-center">
      <TagsList tags={questionTags} />
      <div className="text-xs text-soma-grey-50">{answersCount}개의 답변</div>
    </div>
  );
}
