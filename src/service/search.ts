import { SearchHistory } from "@/types";
import { ACCESS_TOKEN } from "@/utils/const";

export async function addSearchHistory(searchString: string, isTag: boolean): Promise<void> {
  
  const url = new URL(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/search/history`);
  const params = { searchString:searchString, isTag:isTag.toString() };
  url.search = new URLSearchParams(params).toString();

  return fetch(
    url, { method: 'POST', credentials: 'include' }
  ).then((res) => {
    if (res.status != 201) throw new Error('search history error 발생!');
  });
}

export async function getRecentSearchHistoryTop10(cookie?:string): Promise<SearchHistory[]> {

  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/search/history`, { 
      next: { revalidate: 0 },
      // headers: { Cookie: `${ACCESS_TOKEN}=${cookie}` },
      headers: { Cookie: `${ACCESS_TOKEN}=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzMSIsImF1dGgiOiIiLCJleHAiOjE2OTQ0MDAzNzJ9.aeID6QGCFNNNSTNmIJSR6xkLkLCFhpWIbSpZbRf6AhT-vqj8H1haoDhMvO26Z2vFPv9cgqzR2y8ISOfODle_4A` },
    }
  ).then((res) => {
    if (!res.ok) throw new Error('search history error 발생!');
    return res.json();
  }).catch(console.error);
}

export async function removeSearchHistory(historyId:number): Promise<void> {

  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/search/history/${historyId}`, {method: 'DELETE', credentials: 'include'}
  ).then((res) => {
    if (!res.ok) throw new Error('search history error 발생!');
  });
}

export async function refreshSearchHistory(historyId:number): Promise<void> {

  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/search/history/${historyId}`, {method: 'POST', credentials: 'include'}
  ).then((res) => {
    if (!res.ok) throw new Error('search history error 발생!');
  });
}