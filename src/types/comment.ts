export type Comment = {
  id: number;
  authorId: number;
  authorName: string;
  authorImagePath: string;
  commentText: string;
  createdDate: string;
  updatedDate: string;
  likes: number;
  reComments: number;
};
