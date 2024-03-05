import { ErrorResponse, Orderby, Period } from '@/types/common';
import { PostImageResponse } from '@/types/image';
import { Memo, PostMemoData } from '@/types/memo';
import { MEMO_NUMBER_PER_PAGE_FOR_INFINITY_SCROLL } from '@/constants/limit';

export async function getMemos(
  period: Period = 'month',
  orderBy: Orderby = 'new',
  pageNum: number = 0,
  resultCntPerPage: number = MEMO_NUMBER_PER_PAGE_FOR_INFINITY_SCROLL
): Promise<Memo[]> {
  const url = new URL(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/memos`);
  const params = {
    period: period,
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

export async function getMemoDrafts(): Promise<Memo[]> {
  return fetch(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/memos/drafts`, {
    next: { revalidate: 0 },
    credentials: 'include',
  })
    .then((res) => {
      if (!res.ok) throw new Error('error 발생!');
      return res.json();
    })
    .catch(console.error);
}

export async function getMemoById(
  id: number,
  cookie?: string | undefined
): Promise<Memo> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/memos/${id}`,
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
    .then((res) => res.json())
    .catch(console.error);
}

export async function createOrUpdateMemo(
  url: string,
  bodyData: PostMemoData
): Promise<Memo & ErrorResponse> {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(bodyData),
  })
    .then((res) => res.json())
    .catch(console.error);
}

export async function deleteMemo(id: number): Promise<ErrorResponse> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/memos/${id}`,
    {
      method: 'DELETE',
      credentials: 'include',
    }
  )
    .then((res) => {
      if (!res.ok) return res.json();
    })
    .catch(console.error);
}

export async function postImageInMemo(
  memoId: number,
  image: File
): Promise<PostImageResponse | ErrorResponse> {
  const formdata = new FormData();
  formdata.append('image', image);
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/memos/${memoId}/image`,
    {
      method: 'POST',
      body: formdata,
      credentials: 'include',
    }
  )
    .then((res) => {
      if (res.status === 413) {
        return { code: 413, message: '이미지 크기가 10MB를 초과하였습니다.' };
      }
      return res.json();
    })
    .catch(console.error);
}

export async function getMemoRecommendationsById(
  id: number,
  cookie?: string | undefined
): Promise<Memo[]> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/memos/${id}/recommendations`,
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
      return res.json();
    })
    .catch(console.error);
}
