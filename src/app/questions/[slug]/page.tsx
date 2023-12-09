import QuestionDetail from '@/components/question/QuestionDetail';
import Header from '@/components/shared/Header';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { getAnswersByQuestionId } from '@/service/answers';
import { checkUser, getUserInfo } from '@/service/auth';
import { getIsLike } from '@/service/like';
import { getMemoById } from '@/service/memos';
import { getNotificationsTop30 } from '@/service/notification';
import { getQuestionById } from '@/service/questions';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/utils/const';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

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

  const question = await getQuestionById(questionId, cookie);
  if (question.id === undefined) {
    notFound();
  }

  const answersData = getAnswersByQuestionId(questionId, cookie);
  const myData = checkUser(cookie);
  const likeData = getIsLike('questions', questionId, cookie);

  const [answers, { id, isLogin, authority }, { isLike }] = await Promise.all([
    answersData,
    myData,
    likeData,
  ]);

  const { profileImageFilePath } = isLogin
    ? await getUserInfo(id)
    : { profileImageFilePath: undefined };

  const notifications = isLogin ? await getNotificationsTop30(cookie) : [];

  const { memoTitle } = question.memoId
    ? await getMemoById(question.memoId)
    : {
        memoTitle: '',
      };

  return (
    <section>
      <Header
        isLogin={isLogin}
        notifications={notifications}
        profileImageFilePath={profileImageFilePath}
        currentPage="questions"
        authority={authority}
      />
      <LayoutWrapper>
        <QuestionDetail
          questionData={question}
          answers={answers}
          isLike={isLike}
          userId={id}
          memoTitle={memoTitle}
          isLogin={isLogin}
        />
      </LayoutWrapper>
    </section>
  );
}

export async function generateMetadata({ params: { slug } }: Props) {
  const questionId = Number(slug);
  const { title, description } = await getQuestionById(questionId);
  if (title === undefined) {
    notFound();
  }

  return {
    title: title,
    description: description.slice(0, 160),
  };
}
