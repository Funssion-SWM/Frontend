import MePostCategories from '@/components/me/MePostCategories';
import MemosGrid from '@/components/memo/MemosGrid';
import { getLikedMemosByUserId } from '@/service/me';

type Props = {
  params: {
    slug: string;
  };
};

export default async function MeLikepage({ params: { slug } }: Props) {
  const userId = +slug;
  const memos = await getLikedMemosByUserId(userId);

  return (
    <>
      <MePostCategories userId={userId} selected="memo" bigCategory="like" />
      <MemosGrid memos={memos} colNum={3} />
    </>
  );
}
