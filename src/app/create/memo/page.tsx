import EditorForm from '@/components/EditorForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '메모 작성',
  description: '메모를 작성하는 곳입니다.',
};

export default function CreateMemoPage() {
  return <EditorForm isFirst={true} />;
}
