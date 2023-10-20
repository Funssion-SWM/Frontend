import { Rank } from '@/types/rank';
import bronze5 from '@/assets/icons/rank/bronze_5.svg';
import bronze4 from '@/assets/icons/rank/bronze_4.svg';
import bronze3 from '@/assets/icons/rank/bronze_3.svg';
import bronze2 from '@/assets/icons/rank/bronze_2.svg';
import bronze1 from '@/assets/icons/rank/bronze_1.svg';
import silver5 from '@/assets/icons/rank/silver_5.svg';
import silver4 from '@/assets/icons/rank/silver_4.svg';
import silver3 from '@/assets/icons/rank/silver_3.svg';
import silver2 from '@/assets/icons/rank/silver_2.svg';
import silver1 from '@/assets/icons/rank/silver_1.svg';
import gold5 from '@/assets/icons/rank/gold_5.svg';
import gold4 from '@/assets/icons/rank/gold_4.svg';
import gold3 from '@/assets/icons/rank/gold_3.svg';
import gold2 from '@/assets/icons/rank/gold_2.svg';
import gold1 from '@/assets/icons/rank/gold_1.svg';
import platinum5 from '@/assets/icons/rank/platinum_5.svg';
import platinum4 from '@/assets/icons/rank/platinum_4.svg';
import platinum3 from '@/assets/icons/rank/platinum_3.svg';
import platinum2 from '@/assets/icons/rank/platinum_2.svg';
import platinum1 from '@/assets/icons/rank/platinum_1.svg';
import diamond5 from '@/assets/icons/rank/diamond_5.svg';
import diamond4 from '@/assets/icons/rank/diamond_4.svg';
import diamond3 from '@/assets/icons/rank/diamond_3.svg';
import diamond2 from '@/assets/icons/rank/diamond_2.svg';
import diamond1 from '@/assets/icons/rank/diamond_1.svg';
import infinity5 from '@/assets/icons/rank/infinity_5.svg';
import infinity4 from '@/assets/icons/rank/infinity_4.svg';
import infinity3 from '@/assets/icons/rank/infinity_3.svg';
import infinity2 from '@/assets/icons/rank/infinity_2.svg';
import infinity1 from '@/assets/icons/rank/infinity_1.svg';

export function getImageSrcFromRank(rank: Rank): string {
  switch (rank) {
    case 'BRONZE_5':
      return bronze5;
    case 'BRONZE_4':
      return bronze4;
    case 'BRONZE_3':
      return bronze3;
    case 'BRONZE_2':
      return bronze2;
    case 'BRONZE_1':
      return bronze1;
    case 'SILVER_5':
      return silver5;
    case 'SILVER_4':
      return silver4;
    case 'SILVER_3':
      return silver3;
    case 'SILVER_2':
      return silver2;
    case 'SILVER_1':
      return silver1;
    case 'GOLD_5':
      return gold5;
    case 'GOLD_4':
      return gold4;
    case 'GOLD_3':
      return gold3;
    case 'GOLD_2':
      return gold2;
    case 'GOLD_1':
      return gold1;
    case 'PLATINUM_5':
      return platinum5;
    case 'PLATINUM_4':
      return platinum4;
    case 'PLATINUM_3':
      return platinum3;
    case 'PLATINUM_2':
      return platinum2;
    case 'PLATINUM_1':
      return platinum1;
    case 'DIAMOND_5':
      return diamond5;
    case 'DIAMOND_4':
      return diamond4;
    case 'DIAMOND_3':
      return diamond3;
    case 'DIAMOND_2':
      return diamond2;
    case 'DIAMOND_1':
      return diamond1;
    case 'INFINITY_5':
      return infinity5;
    case 'INFINITY_4':
      return infinity4;
    case 'INFINITY_3':
      return infinity3;
    case 'INFINITY_2':
      return infinity2;
    case 'INFINITY_1':
      return infinity1;
    default:
      throw new Error('wrong rank type');
  }
}

export function calcRankPercentage(numerator: number, denominator: number) {
  const divided = numerator / (denominator === 0 ? 100 : denominator);
  if (divided === 1) return 0;
  return Math.round(divided * 1000) / 10;
}
