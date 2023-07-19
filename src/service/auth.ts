import axios from 'axios';

const ACCESS_TOKEN = 'access_token';

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

  saveToken(ACCESS_TOKEN, res.data.token);
  return res;
}

export function logout() {
  clearToken();
}

export function sendCodeToEmail(email: string) {
  return axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/auth/email_code`,
    {
      email,
    }
  );
}

export function confirmCode(code: string) {
  return axios.post(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/auth/email_code/validity`,
    { code }
  );
}

export function checkNickname(nickname: string) {
  return axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/auth/nickname/${nickname}`
  );
}

export function checkEmail(email: string) {
  return axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/auth/email/${email}`
  );
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
