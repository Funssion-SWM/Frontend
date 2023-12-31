import { getAnswerdQuestionsByUserId } from '@/service/me';
import MeNavigator from '@/components/me/MeNavigator';
import MeQuestionsContainer from '@/components/me/MeQuestionsContainer';

type Props = {
  params: {
    slug: string;
  };
};

export default async function MeQuestionAnsweredPage({
  params: { slug },
}: Props) {
  const userId = +slug;
  const questions = await getAnswerdQuestionsByUserId(userId);

  return (
    <section className="w-full grow sm:px-4 sm:py-2">
      <MeNavigator userId={userId} type="question_answered" />
      <MeQuestionsContainer
        questions={questions}
        userId={userId}
        bigCategory="answered"
      />
    </section>
  );
}
