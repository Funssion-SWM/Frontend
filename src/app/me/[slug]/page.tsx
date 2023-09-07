import Header from '@/components/shared/Header';
import Profile from '@/components/me/Profile';
import { getHistory, getMemosByUserId } from '@/service/me';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import History from '@/components/me/History';
import { checkUser, getUserInfo } from '@/service/auth';
import SettingBtns from '@/components/me/SettingBtns';
import MeMainContainer from '@/components/me/MeMainContainer';
import { cookies } from 'next/headers';
import { ACCESS_TOKEN } from '@/utils/const';

type Props = {
  params: {
    slug: number;
  };
};

export default async function MePage({ params: { slug } }: Props) {
  const memos = await getMemosByUserId(slug);
  const userInfo = await getUserInfo(slug);
  const { isLogin } = await checkUser(cookies().get(ACCESS_TOKEN)?.value);
  const history = await getHistory(
    slug,
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    true
  );
  return (
    <section>
      <Header
        isLogin={isLogin}
        profileImageFilePath={userInfo.profileImageFilePath}
      />
      <LayoutWrapper>
        <div className="flex flex-col sm:flex-row">
          <section className="flex flex-col items-center sm:w-[300px] min-h-screen p-6 bg-soma-grey-20">
            <Profile userInfo={userInfo} />
            <History history={history} userId={slug} />
            <SettingBtns userId={slug} />
          </section>
          <MeMainContainer memos={memos} userId={slug} />
        </div>
      </LayoutWrapper>
    </section>
  );
}

export async function generateMetadata({ params }: Props) {
  const { nickname } = await getUserInfo(params.slug);

  return {
    title: nickname,
  };
}
