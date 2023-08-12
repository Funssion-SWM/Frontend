import Header from '@/components/shared/Header';
import MemosGrid from '@/components/memo/MemosGrid';
import Profile from '@/components/shared/Profile';
import { getHistory, getMemosByUserId } from '@/service/me';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import History from '@/components/history/History';
import { getUserInfo2 } from '@/service/auth';
import SettingBtns from '@/components/me/SettingBtns';

type Props = {
  params: {
    slug: number;
  };
};

export default async function MePage({ params: { slug } }: Props) {
  const memos = await getMemosByUserId(slug);
  const userInfo = await getUserInfo2(slug);
  const history = await getHistory(
    slug,
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    true
  );
  return (
    <section>
      <Header />
      <LayoutWrapper>
        <div className="flex">
          <section className="flex flex-col w-[300px] min-h-screen p-6 bg-soma-grey-20">
            <Profile userInfo={userInfo} />
            <History history={history} userId={slug} />
            {/* <SettingBtns userId={slug} /> */}
          </section>
          <section className="grow w-full p-6">
            <h3 className="font-bold text-2xl mb-1">My Memos</h3>
            <MemosGrid memos={memos} colNum={3} />
          </section>
        </div>
      </LayoutWrapper>
    </section>
  );
}

export async function generateMetadata({ params }: Props) {
  const { nickname } = await getUserInfo2(params.slug);

  return {
    title: nickname,
  };
}
