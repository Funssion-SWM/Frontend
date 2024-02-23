import SeriesContainer from '@/components/series/SeriesContainer';
import { getSeriesArray } from '@/service/series';

export default async function SeriesHotpage() {
  let seriesArray = await getSeriesArray('month', 'hot');

  return <SeriesContainer seriesArray={seriesArray} type="hot" />;
}
