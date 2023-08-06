import EditorForm from '@/components/EditorForm';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '메모 작성',
  description: '메모를 작성하는 곳입니다.',
};

export default function CreateMemoPage() {
  return (
    <LayoutWrapper paddingY="py-10" bgColor="bg-soma-grey-10">
      <EditorForm alreadyExists={true} />
    </LayoutWrapper>
  );
}
