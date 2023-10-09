import EditorForm from '@/components/create/memo/EditorForm';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: '메모 작성',
  description: '메모를 작성하는 곳입니다.',
};

export default function CreateMemoPage() {
  const headersList = headers();
  const referer = headersList.get('referer');
  referer === null && redirect('/memos');

  return (
    <LayoutWrapper paddingY="sm:py-10">
      <EditorForm />
    </LayoutWrapper>
  );
}
