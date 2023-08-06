import { CheckUserResponse, LoginData, SignUpData } from '@/types';
import { URLSearchParams } from 'next/dist/compiled/@edge-runtime/primitives/url';

export async function signUp(userData: SignUpData) {
  return fetch(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('error');
      }
    })
    .catch(console.error);
}

export async function login(userData: LoginData) {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/users/login`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(userData),
    }
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error('error');
      }
      return res.json();
    })
    .catch(console.error);
}

export async function logout() {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/users/logout`,
    {
      credentials: 'include',
    }
  )
    .then((res) => {
      if (!res.ok) throw new Error('error!!');
    })
    .catch(console.error);
}

export async function checkUser(): Promise<CheckUserResponse> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/users/check`,
    {
      credentials: 'include',
    }
  )
    .then((res) => {
      if (!res.ok) throw new Error('error!!');
      return res.json();
    })
    .catch(console.error);
}

export async function checkEmailAndSendCode(email: string) {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/users/authenticate-email`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    }
  )
    .then((res) => {
      if (!res.ok) throw new Error('error!!');
      return res.json();
    })
    .catch(console.error);
}

export async function confirmCode(email: string, code: string) {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/users/authenticate-code`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
    }
  )
    .then((res) => {
      if (!res.ok) throw new Error('error!!');
      return res.json();
    })
    .catch(console.error);
}

export async function checkNickname(nickname: string) {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/users/check-duplication?` +
      new URLSearchParams({ name: nickname })
  )
    .then((res) => {
      if (!res.ok) throw new Error('error!!');
      return res.json();
    })
    .catch(console.error);
}
