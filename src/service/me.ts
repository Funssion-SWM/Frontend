import { HistoryItem } from '@/types';
import { Memo } from '@/types/memo';
import { Question } from '@/types/question';
import { RankInfo, Stats } from '@/types/rank';
import { Series } from '@/types/series';
import {
  MEMO_NUMBER_PER_PAGE_FOR_INFINITY_SCROLL,
  QUESTION_NUMBER_PER_PAGE_FOR_INFINITY_SCROLL,
  SERIES_NUMBER_PER_PAGE_FOR_INFINITY_SCROLL,
} from '@/constants/limit';

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

export async function getMemosByUserId(
  userId: number,
  pageNum: number = 0,
  resultCntPerPage: number = MEMO_NUMBER_PER_PAGE_FOR_INFINITY_SCROLL
): Promise<Memo[]> {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/mypage/${userId}/memos`
  );
  const params = {
    pageNum: pageNum.toString(),
    resultCntPerPage: resultCntPerPage.toString(),
  };
  url.search = new URLSearchParams(params).toString();

  return fetch(url, { next: { revalidate: 0 } })
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

export async function getLikedMemosByUserId(
  userId: number,
  pageNum: number = 0,
  resultCntPerPage: number = MEMO_NUMBER_PER_PAGE_FOR_INFINITY_SCROLL
): Promise<Memo[]> {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/mypage/${userId}/memos/liked`
  );
  const params = {
    pageNum: pageNum.toString(),
    resultCntPerPage: resultCntPerPage.toString(),
  };
  url.search = new URLSearchParams(params).toString();

  return fetch(url, { next: { revalidate: 0 } })
    .then((res) => {
      if (!res.ok) throw new Error('error 발생!');
      return res.json();
    })
    .catch(console.error);
}

export async function getQuestionsByUserId(
  userId: number,
  pageNum: number = 0,
  resultCntPerPage: number = QUESTION_NUMBER_PER_PAGE_FOR_INFINITY_SCROLL
): Promise<Question[]> {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/mypage/${userId}/questions`
  );
  const params = {
    pageNum: pageNum.toString(),
    resultCntPerPage: resultCntPerPage.toString(),
  };
  url.search = new URLSearchParams(params).toString();

  return fetch(url, { next: { revalidate: 0 } })
    .then((res) => {
      if (!res.ok) throw new Error('get question by user id error 발생!');
      return res.json();
    })
    .catch(console.error);
}

export async function getLikedQuestionsByUserId(
  userId: number,
  pageNum: number = 0,
  resultCntPerPage: number = QUESTION_NUMBER_PER_PAGE_FOR_INFINITY_SCROLL
): Promise<Question[]> {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/mypage/${userId}/questions/liked`
  );
  const params = {
    pageNum: pageNum.toString(),
    resultCntPerPage: resultCntPerPage.toString(),
  };
  url.search = new URLSearchParams(params).toString();

  return fetch(url, { next: { revalidate: 0 } })
    .then((res) => {
      if (!res.ok) throw new Error('get question by user id error 발생!');
      return res.json();
    })
    .catch(console.error);
}

export async function getSeriesByUserId(
  userId: number,
  pageNum: number = 0,
  resultCntPerPage: number = SERIES_NUMBER_PER_PAGE_FOR_INFINITY_SCROLL
): Promise<Series[]> {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/mypage/${userId}/series`
  );
  const params = {
    pageNum: pageNum.toString(),
    resultCntPerPage: resultCntPerPage.toString(),
  };
  url.search = new URLSearchParams(params).toString();

  return fetch(url, { next: { revalidate: 0 } })
    .then((res) => {
      if (!res.ok) throw new Error('get series by user id error 발생!');
      return res.json();
    })
    .catch(console.error);
}

export async function getLikedSeriesByUserId(
  userId: number,
  pageNum: number = 0,
  resultCntPerPage: number = SERIES_NUMBER_PER_PAGE_FOR_INFINITY_SCROLL
): Promise<Series[]> {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/mypage/${userId}/series/liked`
  );
  const params = {
    pageNum: pageNum.toString(),
    resultCntPerPage: resultCntPerPage.toString(),
  };
  url.search = new URLSearchParams(params).toString();

  return fetch(url, { next: { revalidate: 0 } })
    .then((res) => {
      if (!res.ok) throw new Error('get liked series by user id error 발생!');
      return res.json();
    })
    .catch(console.error);
}

export async function getAnswerdQuestionsByUserId(
  userId: number,
  pageNum: number = 0,
  resultCntPerPage: number = QUESTION_NUMBER_PER_PAGE_FOR_INFINITY_SCROLL
): Promise<Question[]> {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/mypage/${userId}/questions/answered`
  );
  const params = {
    pageNum: pageNum.toString(),
    resultCntPerPage: resultCntPerPage.toString(),
  };
  url.search = new URLSearchParams(params).toString();

  return fetch(url, { next: { revalidate: 0 } })
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
