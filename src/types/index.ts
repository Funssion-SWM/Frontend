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

export type FindPasswrdFormData = {
  email: string;
  authCode: string;
  pw: string;
  confirmPw: string;
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

export type UserInfo = {
  userId: number;
  profileImageFilePath: string;
  nickname: string;
  introduce: string;
  userTags: string[];
  followCnt: number;
  followerCnt: number;
  isFollowed: boolean;
};

export type HistoryItem = {
  id: number;
  date: string;
  postCnt: number;
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

export type FindEmailResponse = {
  email: string;
  message: string;
};

export type ErrorResponse = {
  code: number;
  message: string;
};
