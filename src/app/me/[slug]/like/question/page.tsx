import MePostCategories from '@/components/me/MePostCategories';
import MeQuestionsContainer from '@/components/me/MeQuestionsContainer';
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
      <MeQuestionsContainer
        questions={questions}
        userId={userId}
        bigCategory="like"
      />
    </>
  );
}
