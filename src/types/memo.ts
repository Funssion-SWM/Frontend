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
  isTemporary: boolean;
};

export type PostMemoData = {
  memoTitle: string;
  memoDescription: string;
  memoText: string;
  memoColor: string;
  isTemporary ?: boolean;
};

export type MemoColor =
  | 'yellow'
  | 'green'
  | 'skyblue'
  | 'orange'
  | 'pink'
  | 'navy'
  | 'purple';