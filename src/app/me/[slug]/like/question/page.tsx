import MePostCategories from '@/components/me/MePostCategories';
import QuestionsList from '@/components/question/QuestionsList';
import { getLikedQuestionsByUserId, getQuestionsByUserId } from '@/service/me';

type Props = {
  params: {
    slug: string;
  };
};

export default async function MeLikedQuestionPage({ params: { slug } }: Props) {
  const userId = +slug;
  const questions = await getLikedQuestionsByUserId(userId);

  return (
    <>
      <MePostCategories
        userId={userId}
        selected="question"
        bigCategory="like"
      />
      <QuestionsList questions={questions} size="big" />
    </>
  );
}
