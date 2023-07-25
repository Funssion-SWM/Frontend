import { ACCESS_TOKEN } from '@/utils/const';

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

export async function signUp(userData: SignUpData) {
  return fetch(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
}

export async function login(userData: LoginData) {
  return fetch(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
}

export function logout() {
  clearToken();
}

export function getUserId() {
  return fetch(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/users/check`, {
    headers: {
      Authorization: `Bearer ${getToken(ACCESS_TOKEN)}`,
    },
  });
}

export async function sendCodeToEmail(email: string) {
  return fetch(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/auth/email_code`, {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

export function confirmCode(code: string) {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/auth/email_code/validity`,
    {
      method: 'POST',
      body: JSON.stringify({ code }),
    }
  );
}

export async function checkNickname(nickname: string) {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/auth/nickname/${nickname}`
  );
}

export function checkEmail(email: string) {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/auth/email/${email}`
  );
}

export function saveToken(type: string, token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(type, token);
  }
}

export function getToken(type: string) {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(type);
  }
}

export function isLogin() {
  if (getToken(ACCESS_TOKEN) === null) return false;
  return true;
}

function clearToken() {
  if (typeof window !== 'undefined') {
    localStorage.clear();
  }
}
