import TagsList from '../shared/TagsList';

type Props = {
  questionTags: string[];
  createdDate: string;
};

export default function QuestionFooter({ questionTags, createdDate }: Props) {
  return (
    <div className="flex justify-between">
      <TagsList tags={questionTags} />
      <p>{createdDate}</p>
    </div>
  );
}
