'use client';

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 237, 246, 1)',
        'rgba(228, 247, 253, 1)',
        'rgba(255, 249, 229, 1)',
        'rgba(230, 255, 240, 1)',
        'rgba(240, 235, 255, 1)',
        'rgba(255, 235, 224, 1)',
      ],
      borderColor: ['rgba(0, 0, 0, 1)'],
      borderWidth: 1.5,
    },
  ],
};

export default function PieChart() {
  return (
    <Pie
      data={data}
      options={{
        plugins: { legend: { position: 'bottom' } },
        maintainAspectRatio: false,
      }}
      className="w-3/5"
    />
  );
}
