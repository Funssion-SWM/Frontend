import QuestionsContainer from '@/components/question/QuestionsContainer';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { checkUser, getUserInfo } from '@/service/auth';
import { getQuestions } from '@/service/questions';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/utils/const';
import { cookies } from 'next/headers';

export default async function QuestionsPage() {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value;
  const refreshToken = cookies().get(REFRESH_TOKEN)?.value;
  const cookie = `${ACCESS_TOKEN}=${accessToken}; ${REFRESH_TOKEN}=${refreshToken}`;

  const questionData = getQuestions();
  const myData = checkUser(cookie);
  const [questions, { id, isLogin }] = await Promise.all([
    questionData,
    myData,
  ]);

  const { profileImageFilePath } = isLogin
    ? await getUserInfo(id)
    : { profileImageFilePath: undefined };

  return (
    <section>
      <Header
        isLogin={isLogin}
        profileImageFilePath={profileImageFilePath}
        currentPage="questions"
      />
      <LayoutWrapper paddingY="sm:py-5">
        <QuestionsContainer questions={questions} />
      </LayoutWrapper>
      <Footer />
    </section>
  );
}
