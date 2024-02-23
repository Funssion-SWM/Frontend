import SeriesContainer from '@/components/series/SeriesContainer';
import { getSeriesArray } from '@/service/series';

export default async function SeriesNewPage() {
  let seriesArray = await getSeriesArray('month', 'new');

  return <SeriesContainer seriesArray={seriesArray} type="new" />;
}
