import Header from '@/components/shared/Header';
import { getHistory, getMemosByUserId } from '@/service/me';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { checkUser, getUserInfo } from '@/service/auth';
import MeMainContainer from '@/components/me/MeMainContainer';
import { cookies } from 'next/headers';
import { ACCESS_TOKEN } from '@/utils/const';
import MeSideBar from '@/components/me/MeSideBar';

type Props = {
  params: {
    slug: string;
  };
};

export default async function MePage({ params: { slug } }: Props) {
  const cookie = cookies().get(ACCESS_TOKEN)?.value;
  const userId = Number(slug);

  const memosData = getMemosByUserId(userId);
  const userData = getUserInfo(userId);
  const historyData = getHistory(
    userId,
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    true
  );
  const myData = checkUser(cookie);

  const [memos, userInfo, history, { id, isLogin }] = await Promise.all([
    memosData,
    userData,
    historyData,
    myData,
  ]);

  const { profileImageFilePath } = isLogin
    ? await getUserInfo(id)
    : { profileImageFilePath: undefined };

  return (
    <section>
      <Header isLogin={isLogin} profileImageFilePath={profileImageFilePath} />
      <LayoutWrapper>
        <div className="flex flex-col sm:flex-row">
          <MeSideBar
            userInfo={userInfo}
            history={history}
            userId={userId}
            myId={id}
          />
          <MeMainContainer memos={memos} userId={userId} />
        </div>
      </LayoutWrapper>
    </section>
  );
}

export async function generateMetadata({ params }: Props) {
  const userId = Number(params.slug);
  const { nickname } = await getUserInfo(userId);

  return {
    title: nickname,
  };
}
