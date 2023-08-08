import { UserInfo, Record, Memo } from '@/types'

export async function getUserInfo(userId: number): Promise<UserInfo> {
    return fetch(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/mypage/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error('error 발생!');
        return res.json();
    })
    .catch(console.error);
}


export async function getHistory(userId: number,year: number, month: number): Promise<Record[]> {
    return fetch(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/mypage/${userId}/history?year=${year}&month=${month}`)
      .then((res) => {
        if (res.status === 204) {
            return [{
                histotyId:0,
                date: '',
                postCnt: 0
            }];
        }
        else if (!res.ok) throw new Error('error 발생!');
        return res.json();
    })
}

export async function getMemosByUserId(userId: number): Promise<Memo[]> {
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