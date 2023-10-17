'use client';

import { Orderby } from '@/types';
import CategoryBtn from '../shared/btn/CategoryBtn';
import { useEffect, useState } from 'react';
import SeriesGrid from './SeriesGrid';
import { Series } from '@/types/series';
import { getSeriesArray } from '@/service/series';
import useObserver from '@/hooks/useObserver';

type Props = {
  seriesArray: Series[];
};

export default function SeriesContainer({ seriesArray }: Props) {
  const [currentSeriesArray, setCurrentSeriesArray] =
    useState<Series[]>(seriesArray);
  const [selectedOrderType, setSelectedOrderType] = useState<Orderby>('new');
  const [pageNum, setPageNum] = useState(1);
  const [isEnd, setIsEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (orderBy: Orderby) => {
    setPageNum(1);
    setIsEnd(false);
    const series = await getSeriesArray('month', orderBy, 0, 12);
    if (!('code' in series)) setCurrentSeriesArray(series);
    setSelectedOrderType(orderBy);
  };

  const fetchSeries = () => {
    if (isLoading || isEnd) return;
    setIsLoading(true);
    getSeriesArray('month', selectedOrderType, pageNum, 12)
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
    fetchSeries();
  }, [pageNum]);

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    if (isEnd || isLoading) return;
    entry.isIntersecting && setPageNum(pageNum + 1);
  };

  const { setTarget } = useObserver({ onIntersect });

  return (
    <div>
      <div className="flex gap-2 mb-3">
        <CategoryBtn
          text="New"
          size="big"
          onClick={() => handleClick('new')}
          isSelected={selectedOrderType === 'new'}
        />
        <CategoryBtn
          text="Hot"
          size="big"
          onClick={() => handleClick('hot')}
          isSelected={selectedOrderType === 'hot'}
        />
      </div>
      <SeriesGrid seriesArr={currentSeriesArray} colNum={4} />
      {isEnd ? <></> : <div ref={setTarget} />}
    </div>
  );
}
