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
  likes: number;
};

export type PostMemoData = {
  memoTitle: string;
  memoDescription: string;
  memoText: string;
  memoColor: string;
};

export type MemoColor =
  | 'yellow'
  | 'green'
  | 'skyblue'
  | 'orange'
  | 'pink'
  | 'navy'
  | 'purple';
