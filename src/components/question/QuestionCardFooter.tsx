import TagsList from '../shared/TagsList';

type Props = {
  questionTags: string[];
  answerCount: number;
};

export default function QuestionCardFooter({
  questionTags,
  answerCount,
}: Props) {
  return (
    <div className="flex justify-between">
      <TagsList tags={questionTags} />
      <div className="text-sm to-soma-grey-50">{answerCount}개의 답변</div>
    </div>
  );
}
