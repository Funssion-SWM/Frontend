import MePostCategories from '@/components/me/MePostCategories';
import MeSeriesContainer from '@/components/me/MeSeriesContainer';
import { getSeriesByUserId } from '@/service/me';

type Props = {
  params: {
    slug: string;
  };
};

export default async function MePostSeriesPage({ params: { slug } }: Props) {
  const userId = +slug;
  const series = await getSeriesByUserId(userId);

  return (
    <>
      <MePostCategories userId={userId} selected="series" bigCategory="post" />
      <MeSeriesContainer
        seriesArr={series}
        userId={userId}
        bigCategory="post"
      />
    </>
  );
}
