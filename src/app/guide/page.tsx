import GuideEditor from '@/components/editor/components/GuideEditor';
import GuideHeader from '@/components/shared/GuideHeader';

export default function GuidePage() {
  return (
    <div className="max-w-screen-lg m-auto">
      <GuideHeader />
      <GuideEditor />
    </div>
  );
}
