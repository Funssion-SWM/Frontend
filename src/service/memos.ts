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

type PostMemoData = {
  memoTitle: string;
  memoDescription: string;
  memoText: string;
  memoColor: string;
};

export async function getMemos(
  period: string = 'day',
  orderBy: string = 'new'
) {
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

export async function getMemoById(id: number) {
  return fetch(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/memos/${id}`, {
    next: { revalidate: 0 },
  })
    .then((res) => {
      if (!res.ok) throw new Error('error');
      return res.json();
    })
    .catch(console.error);
}

export async function getMemosByUserId(userId: number) {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/mypage/${userId}/memos`,
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

export async function getUserInfo(userId: number) {
  return fetch(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/mypage/${userId}`)
    .then((res) => {
      if (!res.ok) throw new Error('error 발생!');
      return res.json();
    })
    .catch(console.error);
}

export async function createAndUpdateMemo(
  url: string,
  bodyData: PostMemoData,
  callback: () => void
) {
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
      callback();
    })
    .catch(console.error);
}

export async function deleteMemo(id: number, callback: () => void) {
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
      callback();
    })
    .catch(console.error);
}
