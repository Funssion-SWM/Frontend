'use client';

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Stats } from '@/types/rank';

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  userStats: Stats;
};

export default function PieChart({
  userStats: {
    memoPercent,
    questionPercent,
    answerPercent,
    bestAnswerPercent,
    selectingAnswerPercent,
    likePercent,
    commentPercent,
  },
}: Props) {
  const data = {
    labels: ['메모', '질문', '답변', '채택함', '채택됨', '댓글', '좋아요'],
    datasets: [
      {
        label: '(%)',
        data: [
          memoPercent * 100,
          questionPercent * 100,
          answerPercent * 100,
          selectingAnswerPercent * 100,
          bestAnswerPercent * 100,
          commentPercent * 100,
          likePercent * 100,
        ],
        backgroundColor: [
          'rgba(255, 237, 246, 1)',
          'rgba(228, 247, 253, 1)',
          'rgba(255, 249, 229, 1)',
          'rgba(230, 255, 240, 1)',
          'rgba(240, 235, 255, 1)',
          'rgba(255, 235, 224, 1)',
          'rgba(228, 237, 253, 1)',
        ],
        borderColor: ['rgba(0, 0, 0, 1)'],
        borderWidth: 1.5,
      },
    ],
  };

  return (
    <Pie
      data={data}
      height={300}
      options={{
        responsive: false,
        plugins: { legend: { position: 'right' } },
        maintainAspectRatio: false,
      }}
    />
  );
}
