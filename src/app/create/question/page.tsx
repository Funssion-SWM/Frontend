import QuestionEditorForm from '@/components/create/QuestionEditorForm';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { MAIN_PATH } from '@/utils/const';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: '질문 작성',
  description: '질문을 작성하는 곳입니다.',
};

export default function CreateMemoPage() {
  const headersList = headers();
  const referer = headersList.get('referer');
  referer === null && redirect(MAIN_PATH);

  return (
    <LayoutWrapper paddingY="sm:py-10">
      <QuestionEditorForm />
    </LayoutWrapper>
  );
}
