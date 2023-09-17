import { Orderby, Period } from '@/types';
import { PostImageResponse } from '@/types/image';
import { Memo, PostMemoData } from '@/types/memo';
import { ACCESS_TOKEN } from '@/utils/const';

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

export async function getMemos(
  period: Period = 'month',
  orderBy: Orderby = 'new'
): Promise<Memo[]> {
  const url = new URL(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/memos`);
  const params = { period: period, orderBy: orderBy };
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
  return fetch(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/memos/${id}`, {
    next: { revalidate: 0 },
    headers: {
      Cookie: `${ACCESS_TOKEN}=${cookie}`,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error('error');
      return res.json();
    })
    .catch(console.error);
}

export async function createOrUpdateMemo(
  url: string,
  bodyData: PostMemoData
): Promise<Memo> {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(bodyData),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('error');
      }
      return res.json();
    })
    .catch(console.error);
}

export async function deleteMemo(id: number) {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/memos/${id}`,
    {
      method: 'DELETE',
      credentials: 'include',
    }
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error('error');
      }
    })
    .catch(console.error);
}

export async function postImage(
  memoId: number,
  image: File
): Promise<PostImageResponse> {
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
      if (!res.ok) throw new Error('error!!');
      return res.json();
    })
    .catch(console.error);
}
