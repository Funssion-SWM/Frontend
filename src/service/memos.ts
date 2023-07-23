import { getToken } from './auth';

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

  return fetch(url);
}

export async function createMemo(
  memoTitle: string,
  memoDescription: string,
  memoText: string,
  memoColor: string // 나중에 enum으로 관리
) {
  return fetch(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/memos`, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${getToken('access_token')}`,
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
