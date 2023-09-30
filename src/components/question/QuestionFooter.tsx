import TagsList from '../shared/TagsList';

type Props = {
  tags: string[];
  createdDate: string;
};

export default function QuestionFooter({ tags, createdDate }: Props) {
  return (
    <div className="flex justify-between">
      <TagsList tags={tags} />
      <p className="text-sm text-soma-grey-60">{createdDate}</p>
    </div>
  );
}
