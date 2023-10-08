import { ErrorResponse, Like } from '@/types';

export async function getIsLike(
  postType: 'memos' | 'blogs' | 'questions' | 'answers',
  postId: number,
  cookie?: string | undefined
): Promise<Like> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/${postType}/${postId}/like`,
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
      if (res.status == 404 || res.ok) {
        return res.json();
      }

      throw new Error('error 발생!');
    })
    .catch(console.error);
}

export async function like(
  postType: 'memos' | 'blogs' | 'questions' | 'answers',
  postId: number
): Promise<ErrorResponse> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/${postType}/${postId}/like`,
    { method: 'POST', credentials: 'include' }
  )
    .then((res) => {
      if (!res.ok) return res.json();
    })
    .catch((err) => console.log(err));
}

export async function unlike(
  postType: 'memos' | 'blogs' | 'questions' | 'answers',
  postId: number
): Promise<ErrorResponse> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/${postType}/${postId}/unlike`,
    { method: 'POST', credentials: 'include' }
  )
    .then((res) => {
      if (!res.ok) return res.json();
    })
    .catch((err) => console.log(err));
}

export async function dislike(
  postType: 'memos' | 'blogs' | 'questions' | 'answers',
  postId: number
): Promise<ErrorResponse> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/${postType}/${postId}/dislike`,
    { method: 'POST', credentials: 'include' }
  )
    .then((res) => {
      if (!res.ok) return res.json();
    })
    .catch((err) => console.log(err));
}

export async function undislike(
  postType: 'memos' | 'blogs' | 'questions' | 'answers',
  postId: number
): Promise<ErrorResponse> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/${postType}/${postId}/undislike`,
    { method: 'POST', credentials: 'include' }
  )
    .then((res) => {
      if (!res.ok) return res.json();
    })
    .catch((err) => console.log(err));
}

export async function likeComment(
  commentId: number,
  isReComment: boolean
): Promise<ErrorResponse> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/comments/like/${commentId}?isReComment=${isReComment}`,
    {
      method: 'POST',
      credentials: 'include',
    }
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

export async function unlikeComment(
  commentId: number,
  isReComment: boolean
): Promise<ErrorResponse> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/comments/like/${commentId}?isReComment=${isReComment}`,
    {
      method: 'DELETE',
      credentials: 'include',
    }
  )
    .then((res) => res.json())
    .catch((err) => console.log(err));
}
