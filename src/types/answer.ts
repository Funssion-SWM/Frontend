export type Answer = {
  id: number;
  authorId: number;
  authorName: string;
  authorImagePath: string;
  createdDate: string;
  updatedDate: string;
  likes: number;
  text: string;
  questionId: number;
  repliesCount: number;
  mine: boolean;
  selected: boolean;
};
