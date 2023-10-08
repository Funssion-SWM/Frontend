import QuestionDetail from '@/components/question/QuestionDetail';
import Header from '@/components/shared/Header';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { getAnswersByQuestionId } from '@/service/answers';
import { checkUser, getUserInfo } from '@/service/auth';
import { getIsLike } from '@/service/like';
import { getQuestionById } from '@/service/questions';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/utils/const';
import { cookies } from 'next/headers';

type Props = {
  params: {
    slug: string;
  };
};

export default async function QuestionPage({ params: { slug } }: Props) {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value;
  const refreshToken = cookies().get(REFRESH_TOKEN)?.value;
  const cookie = `${ACCESS_TOKEN}=${accessToken}; ${REFRESH_TOKEN}=${refreshToken}`;
  const questionId = Number(slug);

  const questionData = getQuestionById(questionId, cookie);
  const answersData = getAnswersByQuestionId(questionId, cookie);
  const myData = checkUser(cookie);
  const likeData = getIsLike('questions', questionId, cookie);

  const [question, answers, { id, isLogin }, { isLike }] = await Promise.all([
    questionData,
    answersData,
    myData,
    likeData,
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
      <LayoutWrapper>
        <QuestionDetail
          questionData={question}
          answers={answers}
          isLike={isLike}
          userId={id}
        />
      </LayoutWrapper>
    </section>
  );
}
