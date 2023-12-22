import SeriesContainer from '@/components/series/SeriesContainer';
import { getSeriesArray } from '@/service/series';

export default async function SeriesHotpage() {
  let seriesArray = await getSeriesArray('month', 'hot');

  if ('code' in seriesArray) {
    seriesArray = [];
    console.error('Error when get seriesArr');
  }

  return <SeriesContainer seriesArray={seriesArray} type="hot" />;
}
