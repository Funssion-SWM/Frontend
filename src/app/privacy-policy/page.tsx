import { join } from 'path';
import fs from 'fs';
import MarkDown from '@/components/shared/MarkDown';
import LayoutWrapper from '@/components/shared/LayoutWrapper';

export default async function PrivacyPolicyPage() {
  const markdownPath = join(
    process.cwd(),
    'src/assets/markdown/privacy_policy.md'
  );
  const markdownText = fs.readFileSync(markdownPath, 'utf8');

  return (
    <section className="flex justify-center w-full">
      <LayoutWrapper>
        <MarkDown text={markdownText} />
      </LayoutWrapper>
    </section>
  );
}