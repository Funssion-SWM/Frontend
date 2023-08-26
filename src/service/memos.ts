import { Orderby, Period } from '@/types';
import { Memo, PostMemoData } from '@/types/memo';

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

export async function getMemoById(id: number): Promise<Memo> {
  return fetch(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/memos/${id}`, {
    next: { revalidate: 0 },
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
