import LayoutWrapper from '@/components/shared/LayoutWrapper';
import MarkDown from '@/components/shared/MarkDown';
import { join } from 'path';
import fs from 'fs';

export default function AgreementPage() {
  const markdownPath = join(process.cwd(), 'src/assets/markdown/agreement.md');
  const markdownText = fs.readFileSync(markdownPath, 'utf8');

  return (
    <section className="flex justify-center">
      <LayoutWrapper>
        <MarkDown text={markdownText} />
      </LayoutWrapper>
    </section>
  );
}
