import MeMemosContainer from '@/components/me/MeMemosContainer';
import MePostCategories from '@/components/me/MePostCategories';
import { getLikedMemosByUserId } from '@/service/me';

type Props = {
  params: {
    slug: string;
  };
};

export default async function MeLikedMemoPage({ params: { slug } }: Props) {
  const userId = +slug;
  const memos = await getLikedMemosByUserId(userId);

  return (
    <>
      <MePostCategories userId={userId} selected="memo" bigCategory="like" />
      <MeMemosContainer memos={memos} userId={userId} bigCategory="like" />
    </>
  );
}
