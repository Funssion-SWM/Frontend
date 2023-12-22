'use client';

import { Orderby } from '@/types';
import { useEffect, useRef, useState } from 'react';
import SeriesGrid from './SeriesGrid';
import { Series } from '@/types/series';
import { getSeriesArray } from '@/service/series';
import useObserver from '@/hooks/useObserver';
import { SERIES_NUMBER_PER_PAGE_FOR_INFINITY_SCROLL } from '@/utils/const';
import CategoryLink from '../shared/CategoryLink';

type Props = {
  seriesArray: Series[];
  type: Orderby;
};

export default function SeriesContainer({ seriesArray, type }: Props) {
  const [currentSeriesArray, setCurrentSeriesArray] =
    useState<Series[]>(seriesArray);
  const [pageNum, setPageNum] = useState(1);
  const [isEnd, setIsEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isInitialMount = useRef(true);

  const fetchSeries = () => {
    if (isLoading || isEnd) return;
    setIsLoading(true);
    getSeriesArray(
      'month',
      type,
      pageNum,
      SERIES_NUMBER_PER_PAGE_FOR_INFINITY_SCROLL
    )
      .then((data) => {
        if ('code' in data) {
          return;
        }
        setIsLoading(false);
        if (!data.length) setIsEnd(true);
        else {
          setCurrentSeriesArray([...currentSeriesArray, ...data]);
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      fetchSeries();
    }
  }, [pageNum]);

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    if (isEnd || isLoading) return;
    entry.isIntersecting && setPageNum(pageNum + 1);
  };

  const { setTarget } = useObserver({ onIntersect });

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
      <SeriesGrid seriesArr={currentSeriesArray} colNum={4} />
      {isEnd ? <></> : <div ref={setTarget} />}
    </div>
  );
}
