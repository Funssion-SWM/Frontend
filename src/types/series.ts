import { MemoColor } from './memo';
import { Rank } from './rank';

export type Series = {
  id: number;
  authorId: number;
  authorName: string;
  authorProfileImagePath: string;
  authorRank: Rank;
  title: string;
  description: string;
  thumbnailImagePath: string;
  likes: number;
  created: string;
  topThreeColors: MemoColor[];
};

export type PostSeriesResponse = {
  seriesId: number;
};

export type GetSeriesByIdResponse = {
  id: number;
  title: string;
  description: string;
  thumbnailImagePath: string;
  memoInfoList: MemoInfo[];
  likes: number;
  created: string;
};

export type MemoInfo = {
  id: number;
  title: string;
  color: MemoColor;
};
