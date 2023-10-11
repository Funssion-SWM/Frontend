import { Orderby, SearchHistory } from '@/types';
import { Memo } from '@/types/memo';
import { Question } from '@/types/question';
import { ACCESS_TOKEN } from '@/utils/const';

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
  userId: string
): Promise<Memo[]> {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/memos/search`
  );
  const params = {
    searchString: searchString,
    orderBy: orderBy,
    isTag: isTag.toString(),
    userId: userId,
  };
  url.search = new URLSearchParams(params).toString();

  return fetch(url, { next: { revalidate: 0 } })
    .then((res) => {
      if (!res.ok) throw new Error('error 발생!');
      return res.json();
    })
    .catch(console.error);
}

export async function searchQuestions(
  searchString: string,
  orderBy: Orderby,
  isTag: Boolean,
  userId: string
): Promise<Question[]> {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/questions/search`
  );
  const params = {
    searchString: searchString,
    orderBy: orderBy,
    isTag: isTag.toString(),
    userId: userId,
  };
  url.search = new URLSearchParams(params).toString();

  return fetch(url, { next: { revalidate: 0 } })
    .then((res) => {
      if (!res.ok) throw new Error('error 발생!');
      return res.json();
    })
    .catch(console.error);
}