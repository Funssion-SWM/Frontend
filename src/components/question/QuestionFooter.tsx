import TagsList from '../shared/TagsList';

type Props = {
  tags: string[];
};

export default function QuestionFooter({ tags }: Props) {
  return (
    <div className="flex ">
      <TagsList tags={tags} />
    </div>
  );
}
