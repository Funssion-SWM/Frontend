import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';
register('ko', koLocale);

const MAX_DAY = 7;

export function formatDate(date: string, type: 'YMD' | 'YMDHM') {
  const diff = DayDiffrenceFromNow(date);
  if (diff <= MAX_DAY) {
    return format(date, 'ko');
  }
  switch (type) {
    case 'YMD':
      return extractYMD(date);
    case 'YMDHM':
      return extractYMDHM(date);
    default:
      throw new Error('알맞은 type이 아님');
  }
}

function DayDiffrenceFromNow(date: string) {
  const oldDate = new Date(date);
  const newDate = new Date();
  let diff = Math.abs(newDate.getTime() - oldDate.getTime());
  diff = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return diff;
}

function extractYMD(date: string) {
  return date.substring(0, 10);
}

export function extractYMDHM(date: string) {
  return extractYMD(date) + ' ' + date.substring(11, 16);
}
