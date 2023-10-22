import { Rank } from './rank';

export type Memo = {
  memoId: number;
  memoTitle: string;
  memoText: string;
  memoDescription: string;
  memoColor: MemoColor;
  createdDate: string;
  updatedDate: string;
  authorId: number;
  authorName: string;
  authorProfileImagePath: string;
  repliesCount: number;
  questionCount: number;
  likes: number;
  memoTags: string[];
  isTemporary: boolean;
  isMine: boolean;
  seriesId: number;
  isCreated: boolean;
  authorRank: Rank;
  seriesTitle: string;
};

export type PostMemoData = {
  memoTitle: string;
  memoDescription: string;
  memoText: string;
  memoColor: string;
  memoTags: string[];
  isTemporary?: boolean;
  seriesId?: number | null;
  seriesTitle?: string | null;
};

export type MemoColor =
  | 'white'
  | 'yellow'
  | 'green'
  | 'skyblue'
  | 'orange'
  | 'pink'
  | 'navy'
  | 'purple';
