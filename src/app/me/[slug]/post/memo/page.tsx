import MeMemosContainer from '@/components/me/MeMemosContainer';
import MePostCategories from '@/components/me/MePostCategories';
import { getMemosByUserId } from '@/service/me';

type Props = {
  params: {
    slug: string;
  };
};

export default async function MePostMemoPage({ params: { slug } }: Props) {
  const userId = +slug;
  const memos = await getMemosByUserId(userId);

  return (
    <>
      <MePostCategories userId={userId} selected="memo" bigCategory="post" />
      <MeMemosContainer memos={memos} userId={userId} bigCategory="post" />
    </>
  );
}
