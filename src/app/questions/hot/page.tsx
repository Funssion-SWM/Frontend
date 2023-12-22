import QuestionsContainer from '@/components/question/QuestionsContainer';
import { getQuestions } from '@/service/questions';

export default async function QuestionsHotPage() {
  const questions = await getQuestions('HOT');

  return <QuestionsContainer questions={questions} type="HOT" />;
}
