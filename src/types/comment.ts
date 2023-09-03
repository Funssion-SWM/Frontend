export type Comment = {
  id: number;
  authorId: number;
  authorName: string;
  authorImagePath: string;
  commentText: string;
  createdDate: string;
  updatedDate: string;
  likes: number;
  reComments?: number;
};

export type PostCommentData = {
  postTypeWithComment: 'MEMO' | 'QUESTION';
  postId: number;
  commentText: string;
};

export type PostRecoomentData = {
  parentCommentId: number;
  commentText: string;
  authorId: number;
};
