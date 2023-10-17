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
};

export type PostMemoData = {
  memoTitle: string;
  memoDescription: string;
  memoText: string;
  memoColor: string;
  memoTags: string[];
  isTemporary?: boolean;
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
