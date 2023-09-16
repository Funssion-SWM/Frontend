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

export async function getUserMostUsedTagsTop2(userId: string, cookie?: string | undefined): Promise<string[] | null> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/tags/most/${userId}`,
    {
      credentials: 'include',
      next: { revalidate: 0 },
      headers: {
        Cookie: `${ACCESS_TOKEN}=${cookie}`,
      },
    }
  ).then((res) => {
    if(res.status === 404) return null; 
    else if (!res.ok) throw new Error('error 발생!');
    console.log(res);
    return res.json();
  }).catch(console.error);

}