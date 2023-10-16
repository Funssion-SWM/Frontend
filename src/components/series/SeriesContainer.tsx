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
      thumbnailImagePath: '',
      firstColors: ['yellow', 'green', 'pink'],
      authorName: 'dongree',
      authorId: 0,
      authorProfileImagePath: '',
      likes: 0,
      created: '1일 전',
    },
    {
      id: 2,
      title: '자바 정리',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod molestias provident explicabo dolorum fugiat exercitationem ipsa maiores illum aliquid architecto repudiandae fuga odit perspiciatis quidem, rem eaque, tempore cum quos?',
      thumbnailImagePath: '',
      firstColors: ['skyblue', 'purple', 'yellow'],
      authorName: 'dongree',
      authorId: 0,
      authorProfileImagePath: '',
      likes: 0,
      created: '2023-10-05',
    },
    {
      id: 3,
      title: '소프트웨어마에스트로 회고',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod molestias provident explicabo dolorum fugiat exercitationem ipsa maiores illum aliquid architecto repudiandae fuga odit perspiciatis quidem, rem eaque, tempore cum quos?',
      thumbnailImagePath: '',
      firstColors: ['white', 'skyblue', 'yellow'],
      authorName: 'dongree',
      authorId: 0,
      authorProfileImagePath: '',
      likes: 0,
      created: '2023-10-05',
    },
    {
      id: 4,
      title: '자바스크립트 정리',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod molestias provident explicabo dolorum fugiat exercitationem ipsa maiores illum aliquid architecto repudiandae fuga odit perspiciatis quidem, rem eaque, tempore cum quos?',
      thumbnailImagePath: '',
      firstColors: ['yellow', 'green', 'pink'],
      authorName: 'dongree',
      authorId: 0,
      authorProfileImagePath: '',
      likes: 0,
      created: '2023-10-05',
    },
    {
      id: 5,
      title: '자바 정리',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod molestias provident explicabo dolorum fugiat exercitationem ipsa maiores illum aliquid architecto repudiandae fuga odit perspiciatis quidem, rem eaque, tempore cum quos?',
      thumbnailImagePath: '',
      firstColors: ['skyblue', 'purple', 'yellow'],
      authorName: 'dongree',
      authorId: 0,
      authorProfileImagePath: '',
      likes: 0,
      created: '2023-10-05',
    },
    {
      id: 6,
      title: '소프트웨어마에스트로 회고',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod molestias provident explicabo dolorum fugiat exercitationem ipsa maiores illum aliquid architecto repudiandae fuga odit perspiciatis quidem, rem eaque, tempore cum quos?',
      thumbnailImagePath: '',
      firstColors: ['white', 'skyblue', 'yellow'],
      authorName: 'dongree',
      authorId: 0,
      authorProfileImagePath: '',
      likes: 0,
      created: '2023-10-05',
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
