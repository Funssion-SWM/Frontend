import MemosContainer from '@/components/memo/MemosContainer';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { checkUser, getUserInfo } from '@/service/auth';
import { getMemos } from '@/service/memos';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/utils/const';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Inforum - Memos',
  description: 'Inforum Memos 페이지입니다.',
  keywords: ['inforum', '인포럼', 'memo', '메모', '블로그', 'blog'],
};

export default async function MemosPage() {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value;
  const refreshToken = cookies().get(REFRESH_TOKEN)?.value;
  const cookie = `${ACCESS_TOKEN}=${accessToken}; ${REFRESH_TOKEN}=${refreshToken}`;

  const memosData = getMemos('month', 'new', 0, 12);
  const myData = checkUser(cookie);
  const [memos, { id, isLogin }] = await Promise.all([memosData, myData]);

  const { profileImageFilePath } = isLogin
    ? await getUserInfo(id)
    : { profileImageFilePath: undefined };

  return (
    <section>
      <Header
        isLogin={isLogin}
        profileImageFilePath={profileImageFilePath}
        currentPage="memos"
      />
      <LayoutWrapper paddingY="sm:py-5">
        <MemosContainer memos={memos} />
      </LayoutWrapper>
    </section>
  );
}
