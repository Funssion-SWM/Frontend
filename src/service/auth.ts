import {
  CheckUserResponse,
  ErrorResponse,
  FindEmailResponse,
  IsSuccessResponse,
  IsValidResponse,
  SignUpData,
  SignupResponse,
  UserInfo,
} from '@/types';
import { URLSearchParams } from 'next/dist/compiled/@edge-runtime/primitives/url';

export async function signUp(userData: SignUpData): Promise<SignupResponse> {
  return fetch(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
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

export async function login(userData: FormData): Promise<IsSuccessResponse> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/users/login`,
    {
      method: 'POST',
      headers: { Accept: 'application/json' },
      credentials: 'include',
      body: userData,
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

export async function checkUser(
  cookie?: string | undefined
): Promise<CheckUserResponse> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/users/check`,
    cookie
      ? {
          next: { revalidate: 0 },
          headers: {
            // Cookie: `${cookie}`,
            Cookie: 'accessToken=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2OTgiLCJhdXRoIjoiIiwiZXhwIjoxNjk3OTY1NzQ2fQ.YprOQA6U0ppQKv7hCYlDW8kR6KpX0kmREQX24DgaDYfhFT6UoRWvZ_hsH8Ki_LZG4VkrdODar_NohDr09kP6Ig'
          },
        }
      : {
          next: { revalidate: 0 },
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
  email: string,
  type: 'signup' | 'find'
): Promise<IsSuccessResponse & ErrorResponse> {
  return fetch(
    `${
      process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE
    }/users/authenticate-email${type === 'find' ? '/find' : ''}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    }
  )
    .then((res) => res.json())
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
  tags: string[],
  isEmptyProfileImage: string
): Promise<IsSuccessResponse | ErrorResponse> {
  const formdata = new FormData();
  formdata.append('isEmptyProfileImage', isEmptyProfileImage);
  if (image !== null) formdata.append('image', image);
  formdata.append('introduce', introduce);
  formdata.append('tags', JSON.stringify(tags));

  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/users/profile/${id}`,
    {
      method: 'POST',
      body: formdata,
      credentials: 'include',
    }
  )
    .then((res) => res.json())
    .catch(console.error);
}

export async function updateUserInfo(
  id: number,
  image: File | null,
  introduce: string,
  tags: string[],
  isEmptyProfileImage: string
): Promise<IsSuccessResponse | ErrorResponse> {
  const formdata = new FormData();
  formdata.append('isEmptyProfileImage', isEmptyProfileImage);
  if (image !== null) formdata.append('image', image);
  formdata.append('introduce', introduce);
  formdata.append('tags', JSON.stringify(tags));

  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/users/profile/${id}`,
    {
      method: 'PATCH',
      body: formdata,
      credentials: 'include',
    }
  )
    .then((res) => res.json())
    .catch(console.error);
}

export async function getUserInfo(
  userId: number,
  cookie?: string
): Promise<UserInfo> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/users/profile/${userId}`,
    cookie
      ? {
          next: { revalidate: 0 },
          headers: {
            Cookie: `${cookie}`,
          },
        }
      : {
          next: { revalidate: 0 },
          credentials: 'include',
        }
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
      credentials: 'include',
    }
  )
    .then((res) => res.json())
    .catch(console.error);
}

export async function findEmail(nickname: string): Promise<FindEmailResponse> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/users/find-email-by?nickname=${nickname}`
  )
    .then((res) => {
      // if (!res.ok) throw new Error('error 발생!');
      return res.json();
    })
    .catch((err) => err);
}

export async function changePassword(
  email: string,
  code: string,
  userPw: string
): Promise<IsSuccessResponse> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/users/password`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code, userPw }),
    }
  )
    .then((res) => res.json())
    .catch(console.error);
}

export async function withdraw(): Promise<ErrorResponse> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/users/withdraw`,
    {
      method: 'POST',
      credentials: 'include',
    }
  )
    .then((res) => {
      if (!res.ok) return res.json();
    })
    .catch(console.error);
}
