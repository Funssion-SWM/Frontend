import QuestionsContainer from '@/components/question/QuestionsContainer';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { checkUser, getUserInfo } from '@/service/auth';
import { getNotificationsTop30 } from '@/service/notification';
import { getQuestions } from '@/service/questions';
import {
  ACCESS_TOKEN,
  QUESTION_NUMBER_PER_PAGE_FOR_INFINITY_SCROLL,
  REFRESH_TOKEN,
} from '@/utils/const';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: '인포럼 - Q&A',
  description: '인포럼 Q&A 페이지입니다.',
  keywords: ['inforum', '인포럼', 'question', 'answer', '질문', '답변', 'q&a'],
};

export default async function QuestionsPage() {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value;
  const refreshToken = cookies().get(REFRESH_TOKEN)?.value;
  const cookie = `${ACCESS_TOKEN}=${accessToken}; ${REFRESH_TOKEN}=${refreshToken}`;

  const questionData = getQuestions(
    'NEW',
    0,
    QUESTION_NUMBER_PER_PAGE_FOR_INFINITY_SCROLL
  );
  const myData = checkUser(cookie);
  const [questions, { id, isLogin, authority }] = await Promise.all([
    questionData,
    myData,
  ]);

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
      <LayoutWrapper paddingY="sm:py-5">
        <QuestionsContainer questions={questions} />
      </LayoutWrapper>
      <Footer />
    </section>
  );
}
