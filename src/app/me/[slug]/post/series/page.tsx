import MePostCategories from '@/components/me/MePostCategories';
import SeriesGrid from '@/components/series/SeriesGrid';
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
      <SeriesGrid seriesArr={series} colNum={3} />
    </>
  );
}
