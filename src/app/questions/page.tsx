import QuestionsContainer from '@/components/question/QuestionsContainer';
import { getQuestions } from '@/service/questions';

export default async function QuestionsPage() {
  const questions = await getQuestions('NEW');

  return <QuestionsContainer questions={questions} type="NEW" />;
}
