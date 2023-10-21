import { ErrorResponse, Orderby, SearchHistory } from '@/types';
import { Memo } from '@/types/memo';
import { Question } from '@/types/question';
import { Series } from '@/types/series';
import {
  MEMO_NUMBER_PER_PAGE_FOR_INFINITY_SCROLL,
  QUESTION_NUMBER_PER_PAGE_FOR_INFINITY_SCROLL,
  SERIES_NUMBER_PER_PAGE_FOR_INFINITY_SCROLL,
} from '@/utils/const';

const SEARCH_NUMBER_PER_PAGE_TEMPORARY = 100;

export async function addSearchHistory(
  searchString: string,
  isTag: boolean
): Promise<void> {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/search/history`
  );
  const params = { searchString: searchString, isTag: isTag.toString() };
  url.search = new URLSearchParams(params).toString();

  return fetch(url, { method: 'POST', credentials: 'include' }).then((res) => {
    if (res.status != 201) throw new Error('search history error 발생!');
  });
}

export async function getRecentSearchHistoryTop10(
  cookie?: string
): Promise<SearchHistory[]> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/search/history`,
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
      if (!res.ok) throw new Error('search history error 발생!');
      return res.json();
    })
    .catch(console.error);
}

export async function removeSearchHistory(historyId: number): Promise<void> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/search/history/${historyId}`,
    { method: 'DELETE', credentials: 'include' }
  ).then((res) => {
    if (!res.ok) throw new Error('search history error 발생!');
  });
}

export async function refreshSearchHistory(historyId: number): Promise<void> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/search/history/${historyId}`,
    { method: 'POST', credentials: 'include' }
  ).then((res) => {
    if (!res.ok) throw new Error('search history error 발생!');
  });
}

export async function searchMemos(
  searchString: string,
  orderBy: Orderby,
  isTag: Boolean,
  userId: string,
  pageNum: number = 0,
  resultCntPerPage: number = SEARCH_NUMBER_PER_PAGE_TEMPORARY
): Promise<Memo[] | ErrorResponse> {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/memos/search`
  );
  const params = {
    searchString: searchString,
    orderBy: orderBy,
    isTag: isTag.toString(),
    userId: userId,
    pageNum: pageNum.toString(),
    resultCntPerPage: resultCntPerPage.toString(),
  };
  url.search = new URLSearchParams(params).toString();

  return fetch(url, { next: { revalidate: 0 } })
    .then((res) => {
      return res.json();
    })
    .catch(console.error);
}

export async function searchQuestions(
  searchString: string,
  orderBy: Orderby,
  isTag: Boolean,
  userId: string,
  pageNum: number = 0,
  resultCntPerPage: number = SEARCH_NUMBER_PER_PAGE_TEMPORARY
): Promise<Question[] | ErrorResponse> {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/questions/search`
  );
  const params = {
    searchString: searchString,
    orderBy: orderBy,
    isTag: isTag.toString(),
    userId: userId,
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

export async function searchSeries(
  searchString: string,
  orderBy: Orderby,
  pageNum: number = 0,
  resultCntPerPage: number = SEARCH_NUMBER_PER_PAGE_TEMPORARY
): Promise<Series[] | ErrorResponse> {
  const url = new URL(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/series`);
  const params = {
    searchString: searchString,
    orderBy: orderBy,
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
