'use client';

import { Orderby } from '@/types';
import CategoryBtn from '../shared/btn/CategoryBtn';
import { useState } from 'react';
import SeriesGrid from './SeriesGrid';
import { Series } from '@/types/series';

export default function SeriesContainer() {
  const [selectedOrderType, setSelectedOrderType] = useState<Orderby>('new');

  const seriesArr: Series[] = [
    {
      id: 1,
      title: '자바스크립트 정리',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod molestias provident explicabo dolorum fugiat exercitationem ipsa maiores illum aliquid architecto repudiandae fuga odit perspiciatis quidem, rem eaque, tempore cum quos?',
      imageUrl: '',
      firstColors: ['yellow', 'green', 'pink'],
      memoIds: [387, 388, 389, 390],
    },
    {
      id: 2,
      title: '자바 정리',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod molestias provident explicabo dolorum fugiat exercitationem ipsa maiores illum aliquid architecto repudiandae fuga odit perspiciatis quidem, rem eaque, tempore cum quos?',
      imageUrl: '',
      firstColors: ['skyblue', 'purple', 'yellow'],
      memoIds: [387, 388, 389, 390],
    },
    {
      id: 3,
      title: '소프트웨어마에스트로 회고',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod molestias provident explicabo dolorum fugiat exercitationem ipsa maiores illum aliquid architecto repudiandae fuga odit perspiciatis quidem, rem eaque, tempore cum quos?',
      imageUrl: '',
      firstColors: ['white', 'skyblue', 'yellow'],
      memoIds: [387, 388, 389, 390],
    },
    {
      id: 4,
      title: '자바스크립트 정리',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod molestias provident explicabo dolorum fugiat exercitationem ipsa maiores illum aliquid architecto repudiandae fuga odit perspiciatis quidem, rem eaque, tempore cum quos?',
      imageUrl: '',
      firstColors: ['yellow', 'green', 'pink'],
      memoIds: [387, 388, 389, 390],
    },
    {
      id: 5,
      title: '자바 정리',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod molestias provident explicabo dolorum fugiat exercitationem ipsa maiores illum aliquid architecto repudiandae fuga odit perspiciatis quidem, rem eaque, tempore cum quos?',
      imageUrl: '',
      firstColors: ['skyblue', 'purple', 'yellow'],
      memoIds: [387, 388, 389, 390],
    },
    {
      id: 6,
      title: '소프트웨어마에스트로 회고',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod molestias provident explicabo dolorum fugiat exercitationem ipsa maiores illum aliquid architecto repudiandae fuga odit perspiciatis quidem, rem eaque, tempore cum quos?',
      imageUrl: '',
      firstColors: ['white', 'skyblue', 'yellow'],
      memoIds: [387, 388, 389, 390],
    },
  ];

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
      <SeriesGrid seriesArr={seriesArr} colNum={4} />
    </div>
  );
}
