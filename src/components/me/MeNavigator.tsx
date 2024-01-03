import BarLink from '../shared/BarLink';

type Props = {
  userId: number;
  type: 'post' | 'like' | 'question_answered';
};

export default function MeNavigator({ userId, type }: Props) {
  return (
    <section className="flex justify-around w-full my-4">
      <BarLink
        text="내 글"
        isSelected={type === 'post'}
        href={`/me/${userId}/post`}
      />
      <BarLink
        text="내가 답변한 질문"
        isSelected={type === 'question_answered'}
        href={`/me/${userId}/question_answered`}
      />
      <BarLink
        text="좋아요"
        isSelected={type === 'like'}
        href={`/me/${userId}/like`}
      />
    </section>
  );
}
