import SeriesContainer from '@/components/series/SeriesContainer';
import { getSeriesArray } from '@/service/series';

export default async function SeriesNewPage() {
  let seriesArray = await getSeriesArray('month', 'new');

  if ('code' in seriesArray) {
    seriesArray = [];
    console.error('Error when get seriesArr');
  }

  return <SeriesContainer seriesArray={seriesArray} type="new" />;
}
