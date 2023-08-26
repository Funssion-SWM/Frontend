import { UserInfo, HistoryItem } from '@/types';
import { Memo } from '@/types/memo';

export async function getUserInfo(userId: number): Promise<UserInfo> {
  return fetch(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/mypage/${userId}`)
    .then((res) => {
      if (!res.ok) throw new Error('error 발생!');
      return res.json();
    })
    .catch(console.error);
}

export async function getHistory(
  userId: number,
  year: number,
  month: number,
  isSSR: boolean
): Promise<HistoryItem[]> {
  return fetch(
    `${
      isSSR
        ? process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS
        : process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE
    }/mypage/${userId}/history?year=${year}&month=${month}`
  )
    .then((res) => {
      if (!res.ok) throw new Error('error 발생!');
      return res.json();
    })
    .catch(console.error);
}

export async function getMemosByUserId(userId: number): Promise<Memo[]> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/mypage/${userId}/memos`,
    {
      next: { revalidate: 0 },
    }
  )
    .then((res) => {
      if (!res.ok) throw new Error('error 발생!');
      return res.json();
    })
    .catch(console.error);
}

export async function getLikedMemosByUserId(userId: number): Promise<Memo[]> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/mypage/${userId}/memos/liked`,
    {
      next: { revalidate: 0 },
    }
  )
    .then((res) => {
      if (!res.ok) throw new Error('error 발생!');
      return res.json();
    })
    .catch(console.error);
}
