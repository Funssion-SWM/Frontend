import QuestionEditorForm from '@/components/create/QuestionEditorForm';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '질문 작성',
  description: '질문을 작성하는 곳입니다.',
};

export default function CreateMemoPage() {
  return (
    <LayoutWrapper paddingY="sm:py-10" bgColor="bg-soma-grey-10">
      <QuestionEditorForm />
    </LayoutWrapper>
  );
}
