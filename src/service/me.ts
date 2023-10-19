import { HistoryItem } from '@/types';
import { Memo } from '@/types/memo';
import { Question } from '@/types/question';
import { RankInfo, Stats } from '@/types/rank';
import { Series } from '@/types/series';

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

export async function getMemosDraftsByUserId(userId: number): Promise<Memo[]> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/mypage/${userId}/memos/drafts`,
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

export async function getQuestionsByUserId(
  userId: number
): Promise<Question[]> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/mypage/${userId}/questions`,
    {
      next: { revalidate: 0 },
    }
  )
    .then((res) => {
      if (!res.ok) throw new Error('get question by user id error 발생!');
      return res.json();
    })
    .catch(console.error);
}

export async function getLikedQuestionsByUserId(
  userId: number
): Promise<Question[]> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/mypage/${userId}/questions/liked`,
    {
      next: { revalidate: 0 },
    }
  )
    .then((res) => {
      if (!res.ok) throw new Error('get question by user id error 발생!');
      return res.json();
    })
    .catch(console.error);
}

export async function getSeriesByUserId(userId: number): Promise<Series[]> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/mypage/${userId}/series`,
    {
      next: { revalidate: 0 },
    }
  )
    .then((res) => {
      if (!res.ok) throw new Error('get series by user id error 발생!');
      return res.json();
    })
    .catch(console.error);
}

export async function getLikedSeriesByUserId(
  userId: number
): Promise<Series[]> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/mypage/${userId}/series/liked`,
    {
      next: { revalidate: 0 },
    }
  )
    .then((res) => {
      if (!res.ok) throw new Error('get liked series by user id error 발생!');
      return res.json();
    })
    .catch(console.error);
}

export async function getAnswerdQuestionsByUserId(
  userId: number
): Promise<Question[]> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/mypage/${userId}/questions/answered`,
    {
      next: { revalidate: 0 },
    }
  )
    .then((res) => {
      if (!res.ok) throw new Error('get question by user id error 발생!');
      return res.json();
    })
    .catch(console.error);
}

export async function getRankInfoByUserId(userId: number): Promise<RankInfo> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/mypage/${userId}/rank`,
    {
      next: { revalidate: 0 },
    }
  )
    .then((res) => {
      if (!res.ok) throw new Error('get rankinfo by user id error 발생!');
      return res.json();
    })
    .catch(console.error);
}

export async function getStatsByUserId(userId: number): Promise<Stats> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/mypage/${userId}/stats`,
    {
      next: { revalidate: 0 },
    }
  )
    .then((res) => {
      if (!res.ok) throw new Error('get stats by user id error 발생!');
      return res.json();
    })
    .catch(console.error);
}
