'use client';

import { Orderby } from '@/types';
import CategoryBtn from '../shared/btn/CategoryBtn';
import { useState } from 'react';
import SeriesGrid from './SeriesGrid';
import { Series } from '@/types/series';

type Props = {
  seriesArray: Series[];
};

export default function SeriesContainer({ seriesArray }: Props) {
  const [selectedOrderType, setSelectedOrderType] = useState<Orderby>('new');

  const [currentSeriesArray, setCurrentSeriesArray] =
    useState<Series[]>(seriesArray);

  return (
    <div>
      <div className="flex gap-2 mb-3">
        <CategoryBtn
          text="New"
          size="big"
          onClick={() => {}}
          isSelected={selectedOrderType === 'new'}
        />
        <CategoryBtn
          text="Hot"
          size="big"
          onClick={() => {}}
          isSelected={selectedOrderType === 'hot'}
        />
      </div>
      <SeriesGrid seriesArr={currentSeriesArray} colNum={4} />
    </div>
  );
}
