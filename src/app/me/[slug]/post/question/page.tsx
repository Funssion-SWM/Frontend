import MePostCategories from '@/components/me/MePostCategories';
import QuestionsList from '@/components/question/QuestionsList';
import { getQuestionsByUserId } from '@/service/me';

type Props = {
  params: {
    slug: string;
  };
};

export default async function MePostQuestionPage({ params: { slug } }: Props) {
  const userId = +slug;
  const questions = await getQuestionsByUserId(userId);

  return (
    <>
      <MePostCategories
        userId={userId}
        selected="question"
        bigCategory="post"
      />
      <QuestionsList questions={questions} size="big" />
    </>
  );
}
