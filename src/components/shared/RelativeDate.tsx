'use client';

import { formatDate } from '@/service/time';

type Props = {
  date: string;
  type: 'YMD' | 'YMDHM';
};

export default function RelativeDate({ date, type }: Props) {
  return <p className="text-xs text-soma-grey-49">{formatDate(date, type)}</p>;
}
