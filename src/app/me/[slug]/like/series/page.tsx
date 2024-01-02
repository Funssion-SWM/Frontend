import MePostCategories from '@/components/me/MePostCategories';
import SeriesGrid from '@/components/series/SeriesGrid';
import { getLikedSeriesByUserId } from '@/service/me';

type Props = {
  params: {
    slug: string;
  };
};

export default async function MeLikedSeriesPage({ params: { slug } }: Props) {
  const userId = +slug;
  const series = await getLikedSeriesByUserId(userId);

  return (
    <>
      <MePostCategories userId={userId} selected="series" bigCategory="like" />
      <SeriesGrid seriesArr={series} colNum={3} />
    </>
  );
}
