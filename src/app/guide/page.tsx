import GuideEditor from '@/components/guide/GuideEditor';
import GuideHeader from '@/components/guide/GuideHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '에디터 체험',
  description: '에디터를 체험해보는 곳입니다.',
};

export default function GuidePage() {
  return (
    <div className="max-w-screen-lg m-auto">
      <GuideHeader />
      <GuideEditor />
    </div>
  );
}
