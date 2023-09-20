import { Like } from '@/types';

export async function getIsLike(
  postType: string,
  postId: number,
  cookie?: string | undefined
): Promise<Like> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/${postType}/${postId}/like`,
    {
      next: { revalidate: 0 },
      credentials: 'include',
      headers: { Cookie: `${cookie}` },
    }
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
  ).then((res) => {
    if (!res.ok) throw new Error('like error 발생!');
  });
}

export async function unlike(postType: string, postId: number): Promise<void> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/${postType}/${postId}/unlike`,
    { method: 'POST', credentials: 'include' }
  ).then((res) => {
    if (!res.ok) throw new Error('unlike error 발생!');
  });
}

export async function likeComment(commentId: number, isReComment: boolean) {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/comments/like/${commentId}?isReComment=${isReComment}`,
    {
      method: 'POST',
      credentials: 'include',
    }
  ).then((res) => {
    if (!res.ok) throw new Error('like comment error 발생!');
  });
}

export async function unlikeComment(commentId: number, isReComment: boolean) {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/comments/like/${commentId}?isReComment=${isReComment}`,
    {
      method: 'DELETE',
      credentials: 'include',
    }
  ).then((res) => {
    if (!res.ok) throw new Error('unllike comment error 발생!');
  });
}
