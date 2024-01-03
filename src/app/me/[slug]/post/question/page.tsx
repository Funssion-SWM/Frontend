import MePostCategories from '@/components/me/MePostCategories';
import MeQuestionsContainer from '@/components/me/MeQuestionsContainer';
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
      <MeQuestionsContainer
        questions={questions}
        userId={userId}
        bigCategory="post"
      />
    </>
  );
}
