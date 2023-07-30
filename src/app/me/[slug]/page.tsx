import Header from '@/components/shared/Header';
import History from '@/components/history/History';
import MemosGrid from '@/components/memo/MemosGrid';
import Profile from '@/components/shared/Profile';
import { getMemosByUserId, getUserInfo } from '@/service/memos';

type Props = {
  params: {
    slug: number;
  };
};

export default async function MePage({ params: { slug } }: Props) {
  const memos = await getMemosByUserId(slug);
  const userInfo = await getUserInfo(slug);

  return (
    <div className="flex flex-col min-h-screen(-header)">
      <Header />
      <div className="flex">
        <section className="w-[300px] p-6 bg-gray-100">
          <Profile userInfo={userInfo} />
          <History />
        </section>
        <section className="grow w-full p-6">
          <h3 className="font-bold text-2xl mb-1">My Memos</h3>
          <MemosGrid memos={memos} colNum={3} />
        </section>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: Props) {
  const { userName } = await getUserInfo(params.slug);

  return {
    title: userName,
  };
}
