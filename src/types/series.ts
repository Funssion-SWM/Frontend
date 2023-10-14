import { MemoColor } from './memo';

export type Series = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  firstColors: MemoColor[];
  memoIds: number[];
};
