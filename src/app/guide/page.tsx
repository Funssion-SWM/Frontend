import GuideEditor from "@/components/guide/GuideEditor";
import GuideHeader from "@/components/guide/GuideHeader";

export default function GuidePage() {
  return (
    <div className="max-w-screen-lg m-auto">
      <GuideHeader />
      <GuideEditor />
    </div>
  );
}
