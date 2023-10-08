import EditorForm from '@/components/create/memo/EditorForm';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '메모 작성',
  description: '메모를 작성하는 곳입니다.',
};

export default function CreateMemoPage() {
  return (
    <LayoutWrapper paddingY="sm:py-10">
      <EditorForm />
    </LayoutWrapper>
  );
}
