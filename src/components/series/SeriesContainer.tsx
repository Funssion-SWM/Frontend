'use client';

import { Orderby } from '@/types/common';
import SeriesGrid from './SeriesGrid';
import { Series } from '@/types/series';
import { getSeriesArray } from '@/service/series';
import CategoryLink from '../shared/CategoryLink';
import { useInfinityScroll } from '@/hooks/useInfinityScroll';

type Props = {
  seriesArray: Series[];
  type: Orderby;
};

export default function SeriesContainer({ seriesArray, type }: Props) {
  const [data, isEnd, setTarget] = useInfinityScroll(seriesArray, (pageNum) =>
    getSeriesArray('month', type, pageNum)
  );

  return (
    <div>
      <div className="flex gap-2 mb-3">
        <CategoryLink
          text="New"
          href="/series/new"
          size="big"
          isSelected={type === 'new'}
        />
        <CategoryLink
          text="Hot"
          href="/series/hot"
          size="big"
          isSelected={type === 'hot'}
        />
      </div>
      <SeriesGrid seriesArr={data} colNum={4} />
      {isEnd ? <></> : <div ref={setTarget} />}
    </div>
  );
}
