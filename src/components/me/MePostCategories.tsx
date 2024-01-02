import CategoryLink from '../shared/CategoryLink';

type Props = {
  userId: number;
  selected: 'memo' | 'question' | 'series';
  bigCategory: 'post' | 'like';
};

export default function MePostCategories({
  userId,
  selected,
  bigCategory,
}: Props) {
  return (
    <div className="flex gap-2 my-4">
      <CategoryLink
        text="memo"
        href={`/me/${userId}/${bigCategory}/memo`}
        isSelected={selected === 'memo'}
      />
      <CategoryLink
        text="question"
        href={`/me/${userId}/${bigCategory}/question`}
        isSelected={selected === 'question'}
      />
      <CategoryLink
        text="series"
        href={`/me/${userId}/${bigCategory}/series`}
        isSelected={selected === 'series'}
      />
    </div>
  );
}
