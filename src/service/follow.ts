import { ErrorResponse, UserInfo } from '@/types';

export async function follow(userId: string): Promise<void & ErrorResponse> {
  const url = new URL(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/follow`);
  const params = {
    userId: userId,
  };
  url.search = new URLSearchParams(params).toString();

  return fetch(url, { method: 'POST', credentials: 'include' })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export async function unfollow(userId: string): Promise<void & ErrorResponse> {
  const url = new URL(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/unfollow`);
  const params = {
    userId: userId,
  };
  url.search = new URLSearchParams(params).toString();

  return fetch(url, { method: 'POST', credentials: 'include' })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export async function getFollowings(userId: string): Promise<UserInfo[]> {
  const url = new URL(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/follows`);
  const params = {
    userId: userId,
  };
  url.search = new URLSearchParams(params).toString();

  return fetch(url).then((res) => {
    if (!res.ok) throw new Error('get follow 에러 발생!');
    return res.json();
  });
}

export async function getFollowers(userId: string): Promise<UserInfo[]> {
  const url = new URL(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/followers`);
  const params = {
    userId: userId,
  };
  url.search = new URLSearchParams(params).toString();

  return fetch(url).then((res) => {
    if (!res.ok) throw new Error('get follow 에러 발생!');
    return res.json();
  });
}
