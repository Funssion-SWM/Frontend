export type IsSuccessResponse = {
  isSuccess: boolean;
  message: string;
};

export type IsValidResponse = {
  valid: boolean;
  message: string;
};

export type HistoryItem = {
  id: number;
  date: string;
  memoCnt: number;
  blogCnt: number;
  questionCnt: number;
  answerCnt: number;
};

export type Like = {
  isLike: boolean;
  likes: number;
};

export type SearchHistory = {
  id: number;
  searchText: string;
  isTag: boolean;
};

export type Period = 'day' | 'week' | 'month' | 'year';

export type Orderby = 'hot' | 'new';

export type PostType = 'memo' | 'question' | 'answer';

export type ButtonSize = 'small' | 'medium' | 'big';

export type ModalType = 'alert' | 'info';

export type UserType = 'user' | 'employeer' | 'admin';

export type ErrorResponse = {
  code: number;
  message: string;
};
