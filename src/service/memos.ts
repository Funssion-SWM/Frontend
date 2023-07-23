import { JSONContent } from '@tiptap/core';
import { ACCESS_TOKEN, getToken } from './auth';

export type Memo = {
  memoId: number;
  memoTitle: string;
  memoText: string;
  memoDescription: string;
  memoColor: string;
  createdDate: string;
  authorId: number;
  authorName: string;
};

export async function getMemos(
  period: string = 'day',
  orderBy: string = 'new'
) {
  const url = new URL(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/memos`);
  const params = { period: period, orderBy: orderBy };
  url.search = new URLSearchParams(params).toString();

  return fetch(url, { next: { revalidate: 0 } });
}

export async function getMemoById(id: number) {
  return fetch(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/memos/${id}`);
}

export async function createMemo(
  memoTitle: string,
  memoDescription: string,
  memoText: JSONContent | undefined,
  memoColor: string // 나중에 enum으로 관리
) {
  return fetch(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/memos`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${getToken(ACCESS_TOKEN)}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      memoTitle,
      memoDescription,
      memoText,
      memoColor,
    }),
  });
}

export async function deleteMemo(id: number) {
  return fetch(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/memos/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${getToken(ACCESS_TOKEN)}`,
    },
  });
}
