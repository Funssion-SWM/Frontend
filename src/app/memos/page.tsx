import MemosContainer from '@/components/memo/MemosContainer';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { checkUser, getUserInfo } from '@/service/auth';
import { getMemos } from '@/service/memos';
import { ACCESS_TOKEN } from '@/utils/const';
import { cookies } from 'next/headers';

export default async function MemosPage() {
  const memos = await getMemos();
  const { id, isLogin } = await checkUser(cookies().get(ACCESS_TOKEN)?.value);
  const userInfo = id !== -1 ? await getUserInfo(id) : undefined;

  return (
    <section>
      <Header
        isLogin={isLogin}
        profileImageFilePath={userInfo?.profileImageFilePath}
      />
      <LayoutWrapper paddingY="sm:py-5">
        <MemosContainer memos={memos} />
      </LayoutWrapper>
      <Footer />
    </section>
  );
}
