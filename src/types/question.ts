export type Question = {
  id: number;
  authorId: number;
  authorName: string;
  authorImagePath: string;
  createdDate: string;
  updatedDate: string;
  likes: number;
  title: string;
  text: string;
  description: string;
  tags: string[];
  memoId?: number;
  answersCount: number;
  solved: boolean;
};

export type QuestionOrderBy = 'HOT' | 'NEW' | 'ANSWERS' | 'SOLVED';

export type PostQuestionData = {
  title: string;
  text: string;
  description: string;
  tags: string[];
};

export type QuestionCardSize = 'big' | 'small';
