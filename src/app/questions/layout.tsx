import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { checkUser, getUserInfo } from '@/service/auth';
import { getNotificationsTop30 } from '@/service/notification';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/utils/const';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: '인포럼 - Q&A',
  description: '인포럼 Q&A 페이지입니다.',
  keywords: ['inforum', '인포럼', 'question', 'answer', '질문', '답변', 'q&a'],
};

export default async function QuestionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value;
  const refreshToken = cookies().get(REFRESH_TOKEN)?.value;
  const cookie = `${ACCESS_TOKEN}=${accessToken}; ${REFRESH_TOKEN}=${refreshToken}`;

  const { id, isLogin, authority } = await checkUser(cookie);

  const { profileImageFilePath } = isLogin
    ? await getUserInfo(id)
    : { profileImageFilePath: undefined };

  const notifications = isLogin ? await getNotificationsTop30(cookie) : [];

  return (
    <section>
      <Header
        isLogin={isLogin}
        notifications={notifications}
        profileImageFilePath={profileImageFilePath}
        currentPage="questions"
        authority={authority}
      />
      <LayoutWrapper paddingY="sm:py-5">{children}</LayoutWrapper>
      <Footer />
    </section>
  );
}
