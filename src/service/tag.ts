import { ACCESS_TOKEN } from "@/utils/const";

export async function getDefaultTags(): Promise<string[]> {
  return fetch(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/tags`, {
    method: 'GET',
  })
    .then((res) => {
      if (!res.ok) throw new Error('error 발생!');
      return res.json();
    })
    .catch(console.error);
}

export async function getUserTags(userId: string, cookie?: string | undefined): Promise<string[]> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/tags/${userId}`,
    {
      credentials: 'include',
      next: { revalidate: 0 },
      headers: {
        Cookie: `${ACCESS_TOKEN}=${cookie}`,
      },
    }
  ).then((res) => {
    if (!res.ok) throw new Error('error 발생!');
    return res.json();
  }).catch(console.error);

}