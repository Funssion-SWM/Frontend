import {
  Bronze1,
  Bronze2,
  Bronze3,
  Bronze4,
  Bronze5,
  Diamond1,
  Diamond2,
  Diamond3,
  Diamond4,
  Diamond5,
  Gold1,
  Gold2,
  Gold3,
  Gold4,
  Gold5,
  Infinity1,
  Infinity2,
  Infinity3,
  Infinity4,
  Infinity5,
  Platinum1,
  Platinum2,
  Platinum3,
  Platinum4,
  Platinum5,
  Silver1,
  Silver2,
  Silver3,
  Silver4,
  Silver5,
} from '@/assets/svg';
import { Rank } from '@/types/rank';

export function getImageSrcFromRank(rank: Rank): string {
  switch (rank) {
    case 'BRONZE_5':
      return Bronze5;
    case 'BRONZE_4':
      return Bronze4;
    case 'BRONZE_3':
      return Bronze3;
    case 'BRONZE_2':
      return Bronze2;
    case 'BRONZE_1':
      return Bronze1;
    case 'SILVER_5':
      return Silver5;
    case 'SILVER_4':
      return Silver4;
    case 'SILVER_3':
      return Silver3;
    case 'SILVER_2':
      return Silver2;
    case 'SILVER_1':
      return Silver1;
    case 'GOLD_5':
      return Gold5;
    case 'GOLD_4':
      return Gold4;
    case 'GOLD_3':
      return Gold3;
    case 'GOLD_2':
      return Gold2;
    case 'GOLD_1':
      return Gold1;
    case 'PLATINUM_5':
      return Platinum5;
    case 'PLATINUM_4':
      return Platinum4;
    case 'PLATINUM_3':
      return Platinum3;
    case 'PLATINUM_2':
      return Platinum2;
    case 'PLATINUM_1':
      return Platinum1;
    case 'DIAMOND_5':
      return Diamond5;
    case 'DIAMOND_4':
      return Diamond4;
    case 'DIAMOND_3':
      return Diamond3;
    case 'DIAMOND_2':
      return Diamond2;
    case 'DIAMOND_1':
      return Diamond1;
    case 'INFINITY_5':
      return Infinity5;
    case 'INFINITY_4':
      return Infinity4;
    case 'INFINITY_3':
      return Infinity3;
    case 'INFINITY_2':
      return Infinity2;
    case 'INFINITY_1':
      return Infinity1;
    default:
      throw new Error('wrong rank type');
  }
}

export function calcRankPercentage(numerator: number, denominator: number) {
  const divided = numerator / (denominator === 0 ? 100 : denominator);
  if (divided === 1) return 0;
  return Math.round(divided * 1000) / 10;
}
