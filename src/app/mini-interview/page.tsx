import MiniInterviewContainer from '@/components/mini-interview/MiniInterviewContainer';
import LayoutWrapper from '@/components/shared/LayoutWrapper';

export default function MiniInterviewPage() {
  const questions = ['사과가 뭐에요?', '바나나가 뭐에요?', '포도가 뭐에요?'];

  const state = 'ready';

  return (
    <LayoutWrapper paddingY="sm:py-0">
      <MiniInterviewContainer questions={questions} state={state} />
    </LayoutWrapper>
  );
}
