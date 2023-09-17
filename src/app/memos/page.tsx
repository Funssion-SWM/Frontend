import MemosContainer from '@/components/memo/MemosContainer';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { checkUser, getUserInfo } from '@/service/auth';
import { getMemos } from '@/service/memos';
import { ACCESS_TOKEN } from '@/utils/const';
import { cookies } from 'next/headers';

export default async function MemosPage() {
  const cookie = cookies().get(ACCESS_TOKEN)?.value;

  const memosData = getMemos();
  const myData = checkUser(cookie);
  const [memos, { id, isLogin }] = await Promise.all([memosData, myData]);

  const { profileImageFilePath } = isLogin
    ? await getUserInfo(id)
    : { profileImageFilePath: undefined };

  return (
    <section>
      <Header isLogin={isLogin} profileImageFilePath={profileImageFilePath} />
      <LayoutWrapper paddingY="sm:py-5">
        <MemosContainer memos={memos} />
      </LayoutWrapper>
      <Footer />
    </section>
  );
}
