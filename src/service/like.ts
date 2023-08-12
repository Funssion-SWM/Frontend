import { Like } from '@/types';

export async function getIsLiked(
  postType: string,
  postId: number
): Promise<Like> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/${postType}/${postId}/like`,
    { credentials: 'include' }
  )
    .then((res) => {
      if (res.status == 404 || res.ok) {
        return res.json();
      }

      throw new Error('error 발생!');
    })
    .catch(console.error);
}

export async function like(postType: string, postId: number): Promise<void> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/${postType}/${postId}/like`,
    { method: 'POST', credentials: 'include' }
  )
    .then((res) => {
      if (!res.ok) throw new Error('error 발생!');
    })
    .catch(console.error);
}

export async function unlike(postType: string, postId: number): Promise<void> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/${postType}/${postId}/unlike`,
    { method: 'POST', credentials: 'include' }
  )
    .then((res) => {
      console.log(res);
      if (!res.ok) throw new Error('error 발생!');
      return res.json();
    })
    .catch(console.error);
}
