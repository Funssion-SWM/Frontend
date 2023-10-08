'use client';

import { formatDate } from '@/service/time';
import { useEffect, useState } from 'react';

type Props = {
  date: string;
  type: 'YMD' | 'YMDHM';
};

export default function RelativeDate({ date, type }: Props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient && (
      <p className="text-xs text-soma-grey-49">{formatDate(date, type)}</p>
    )
  );
}
