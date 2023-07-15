import axios from 'axios';

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

type SignUpData = {
  user_name: string;
  login_type: number;
  user_email: string;
  user_pw: string;
};

type LoginData = {
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

export function signUp(userData: SignUpData) {
  return axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/users`,
    userData
  );
}

export async function login(userData: LoginData) {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/users/login`,
    userData
  );

  saveToken(ACCESS_TOKEN, res.data.access_token);
  saveToken(REFRESH_TOKEN, res.data.refresh_token);
  return res;
}

export function logout() {
  clearToken();
}

function saveToken(type: string, token: string) {
  localStorage.setItem(type, token);
}

function getToken(type: string) {
  return localStorage.getItem(type);
}

function clearToken() {
  localStorage.clear();
}
