import { MemoColor } from './memo';

export type Series = {
  id: number;
  authorId: number;
  authorName: string;
  authorProfileImagePath: string;
  title: string;
  description: string;
  thumbnailImagePath: string;
  likes: number;
  created: string;
  firstColors: MemoColor[];
};

export type PostSeriesResponse = {
  seriesId: number;
};

export type GetSeriesByIdResponse = {
  id: number;
  title: string;
  description: string;
  memoInfoList: MemoInfo[];
  likes: number;
  created: string;
};

export type MemoInfo = {
  id: number;
  title: string;
};
