import { getMemosByUserId } from '@/service/me';
import MeNavigator from '@/components/me/MeNavigator';
import MePostCategories from '@/components/me/MePostCategories';
import MemosGrid from '@/components/memo/MemosGrid';

type Props = {
  params: {
    slug: string;
  };
};

export default async function MePage({ params: { slug } }: Props) {
  const userId = Number(slug);
  const memos = await getMemosByUserId(userId);

  return (
    <section className="w-full grow sm:px-4 sm:py-2">
      <MeNavigator userId={userId} type="post" />
      <>
        <MePostCategories userId={userId} selected="memo" bigCategory="post" />
        <MemosGrid memos={memos} colNum={3} />
      </>
    </section>
  );
}
