import { UserInfo } from "@/types";

export async function follow(userId: string): Promise<void> {
  const url = new URL(
  `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/follow`
  );
  const params = {
  userId: userId,
  };
  url.search = new URLSearchParams(params).toString();

  return fetch(
    url,
    { method: 'POST', credentials: 'include' }
  ).then((res) => {
    if (res.status === 401) throw new Error('로그인을 해주세요');
    if (!res.ok) throw new Error('follow error 발생!');
  });
}

export async function unfollow(userId: string): Promise<void> {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/unfollow`
  );
  const params = {
    userId: userId,
  };
  url.search = new URLSearchParams(params).toString();

  return fetch(
    url,
    { method: 'POST', credentials: 'include' }
  ).then((res) => {
    if (res.status === 401) throw new Error('로그인을 해주세요');
    if (!res.ok) throw new Error('follow error 발생!');
  });
}

export async function getFollows(userId:string): Promise<UserInfo[]> {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/follows`
  );
  const params = {
    userId: userId,
  };
  url.search = new URLSearchParams(params).toString();

  return fetch(url)
  .then((res) => {
    if(!res.ok) throw new Error("get follow 에러 발생!");
    return res.json();
  })
}

export async function getFollowers(userId:string): Promise<UserInfo[]> {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/followers`
  );
  const params = {
    userId: userId,
  };
  url.search = new URLSearchParams(params).toString();

  return fetch(url)
  .then((res) => {
    if(!res.ok) throw new Error("get follow 에러 발생!");
    return res.json();
  })
}