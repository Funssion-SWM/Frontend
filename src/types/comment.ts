import { Rank } from './rank';

export type Comment = {
  id: number;
  authorId: number;
  authorName: string;
  authorImagePath: string;
  authorRank: Rank;
  commentText: string;
  createdDate: string;
  updatedDate: string;
  likes: number;
  reCommentsNumber?: number;
  isLike: boolean;
  isUserDelete: boolean;
};

export type PostCommentData = {
  postTypeWithComment: 'MEMO' | 'QUESTION' | 'ANSWER';
  postId: number;
  commentText: string;
};

export type PostRecoomentData = {
  parentCommentId: number;
  commentText: string;
  authorId: number;
};
