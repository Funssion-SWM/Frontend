import axios from 'axios';
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

export async function getMemos(period?: string, orderBy?: string) {
  return axios
    .get(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/memos`, {
      params: {
        period,
        orderBy,
      },
    })
    .then((res) => res.data)
    .catch(console.error);
}

export async function createMemo(
  memoTitle: string,
  memoDescription: string,
  memoText: string,
  memoColor: string // 나중에 enum으로 관리
) {
  return axios
    .post(
      `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/memos`,
      {
        memoTitle,
        memoDescription,
        memoText,
        memoColor,
      },
      {
        headers: { Authorization: `Bearer ${getToken('access_token')}` },
      }
    )
    .then((res) => res.data)
    .catch(console.log);
}
