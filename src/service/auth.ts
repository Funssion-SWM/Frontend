import axios from 'axios';

type SignUpData = {
  user_name: string;
  login_type: number;
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

export function signUp(userData: SignUpData) {
  return axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/users`,
    userData
  );
}
