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

// Memo
export type Memo = {
  memoId: number;
  memoTitle: string;
  memoText: string;
  memoDescription: string;
  memoColor: string;
  createdDate: string;
  updatedDate: string;
  authorId: number;
  authorName: string;
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

export type LoginResponse = {
  isSuccess: boolean;
  message: string;
};
