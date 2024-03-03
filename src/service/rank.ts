import { RankingInfo, ScoreInfo } from '@/types/rank';

export async function getTop10Ranking(): Promise<RankingInfo[]> {
  return fetch(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/score/rank`, {
    next: { revalidate: 0 },
  })
    .then((res) => res.json())
    .catch(console.error);
}

export async function getRankingByUserId(id: number): Promise<RankingInfo> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/score/rank/${id}`,
    {
      next: { revalidate: 0 },
    }
  )
    .then((res) => res.json())
    .catch(console.error);
}

export async function getScoreInfoByUserId(id: number): Promise<ScoreInfo> {
  return fetch(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/score/${id}`, {
    next: { revalidate: 0 },
  })
    .then((res) => res.json())
    .catch(console.error);
}
