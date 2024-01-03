'use client';

import { useInfinityScroll } from '@/hooks/useInfinityScroll';
import { getLikedSeriesByUserId, getSeriesByUserId } from '@/service/me';
import { Series } from '@/types/series';
import SeriesGrid from '@/components/series/SeriesGrid';

type Props = {
  seriesArr: Series[];
  userId: number;
  bigCategory: 'post' | 'like';
};

export default function MeSeriesContainer({
  seriesArr,
  userId,
  bigCategory,
}: Props) {
  const [data, isEnd, setTarget] = useInfinityScroll(seriesArr, (pageNum) =>
    bigCategory === 'post'
      ? getSeriesByUserId(userId, pageNum)
      : getLikedSeriesByUserId(userId, pageNum)
  );

  return (
    <>
      <SeriesGrid seriesArr={data} colNum={3} />
      {isEnd ? <></> : <div ref={setTarget} />}
    </>
  );
}
