import {
  CheckUserResponse,
  IsSuccessResponse,
  IsValidResponse,
  LoginData,
  SignUpData,
  SignupResponse,
  UserInfo,
} from '@/types';
import { URLSearchParams } from 'next/dist/compiled/@edge-runtime/primitives/url';

export async function signUp(userData: SignUpData): Promise<SignupResponse> {
  return fetch(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('error');
      }
      return res.json();
    })
    .catch(console.error);
}

export async function login(userData: LoginData): Promise<IsSuccessResponse> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/users/login`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(userData),
    }
  ).then((res) => res.json());
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

export async function checkEmailAndSendCode(
  email: string
): Promise<IsSuccessResponse> {
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

export async function confirmCode(
  email: string,
  code: string
): Promise<IsValidResponse> {
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

export async function checkNickname(
  nickname: string
): Promise<IsValidResponse> {
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

export async function registerUserInfo(
  id: number,
  image: File | null,
  introduce: string,
  tags: string,
  isEmptyProfileImage: string
) {
  const formdata = new FormData();
  formdata.append('isEmptyProfileImage', isEmptyProfileImage);
  if (image !== null) formdata.append('image', image);
  formdata.append('introduce', introduce === '' ? '안녕하세요' : introduce);
  formdata.append('tags', tags === '' ? 'tags' : tags);

  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/users/profile/${id}`,
    {
      method: 'POST',
      body: formdata,
    }
  )
    .then((res) => {
      console.log(res);
      if (!res.ok) throw new Error('error!!');
      return res.json();
    })
    .catch(console.error);
}

export async function updateUserInfo(
  id: number,
  image: File | null,
  introduce: string,
  tags: string,
  isEmptyProfileImage: string
) {
  const formdata = new FormData();
  formdata.append('isEmptyProfileImage', isEmptyProfileImage);
  if (image !== null) formdata.append('image', image);
  formdata.append('introduce', introduce === '' ? '안녕하세요' : introduce);
  formdata.append('tags', tags === '' ? 'tags' : tags);

  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/users/profile/${id}`,
    {
      method: 'PATCH',
      body: formdata,
    }
  )
    .then((res) => {
      console.log(res);
      if (!res.ok) throw new Error('error!!');
      return res.json();
    })
    .catch(console.error);
}

export async function getUserInfo(userId: number): Promise<UserInfo> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/users/profile/${userId}`,
    { next: { revalidate: 0 } }
  )
    .then((res) => {
      if (!res.ok) throw new Error('error 발생!');
      return res.json();
    })
    .catch(console.error);
}

export async function registerNickname(nickname: string, userId: number) {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/users/nickname/${userId}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname }),
    }
  )
    .then((res) => res.json())
    .catch(console.error);
}
