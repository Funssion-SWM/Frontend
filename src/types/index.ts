export type SignUpData = {
  user_name: string;
  login_type: number;
  user_email: string;
  user_pw: string;
};

export type LoginData = {
  user_email: string;
  user_pw: string;
};

export type SignupFormData = {
  email: string;
  authCode: string;
  pw: string;
  confirmPw: string;
  nickname: string;
};

export type LoginFormData = {
  email: string;
  pw: string;
};

export type CheckUserResponse = {
  id: number;
  isLogin: boolean;
};

export type IsSuccessResponse = {
  isSuccess: boolean;
  message: string;
};

export type IsValidResponse = {
  valid: boolean;
  message: string;
};

export type SignupResponse = {
  id: number;
  name: string;
  loginType: string;
  createdDate: string;
  email: string;
};

// Memo
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

export type UserInfo = {
  userName: string;
};

export type UserInfo2 = {
  profileImageFilePath: string;
  nickname: string;
  introduce: string;
  tags: string;
};

export type Record = {
  historyId: number;
  date: string;
  postCnt: number;
};

export type Like = {
  isLike: boolean;
  likes: number;
};

export type Period = 'day' | 'week' | 'month' | 'year';

export type Orderby = 'hot' | 'new';

export type MemoColor =
  | 'yellow'
  | 'green'
  | 'skyblue'
  | 'orange'
  | 'pink'
  | 'navy'
  | 'purple';
