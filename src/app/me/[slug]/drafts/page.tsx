import Header from '@/components/shared/Header';
import { getMemosDraftsByUserId } from '@/service/me';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import MeDraftContainer from '@/components/me/MeDraftContainer';

type Props = {
  params: {
    slug: number;
  };
};

export default async function MeDraftPage({ params: { slug } }: Props) {
  const memos = await getMemosDraftsByUserId(slug);

  return (
    <section>
      <Header />
      <LayoutWrapper paddingY="sm:py-5">
        <MeDraftContainer memos={memos} />
      </LayoutWrapper>
    </section>
  );
}
