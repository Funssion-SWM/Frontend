import { ErrorResponse, IsSuccessResponse, Like } from '@/types/common';

type LikePostType = 'memos' | 'blogs' | 'questions' | 'answers' | 'series';

export async function getIsLike(
  postType: LikePostType,
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
  postType: LikePostType,
  postId: number
): Promise<ErrorResponse> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/${postType}/${postId}/like`,
    { method: 'POST', credentials: 'include' }
  )
    .then((res) => {
      if (!res.ok) return res.json();
    })
    .catch(console.error);
}

export async function unlike(
  postType: LikePostType,
  postId: number
): Promise<ErrorResponse> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/${postType}/${postId}/unlike`,
    { method: 'POST', credentials: 'include' }
  )
    .then((res) => {
      if (!res.ok) return res.json();
    })
    .catch(console.error);
}

export async function dislike(
  postType: LikePostType,
  postId: number
): Promise<ErrorResponse> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/${postType}/${postId}/dislike`,
    { method: 'POST', credentials: 'include' }
  )
    .then((res) => {
      if (!res.ok) return res.json();
    })
    .catch(console.error);
}

export async function undislike(
  postType: LikePostType,
  postId: number
): Promise<ErrorResponse> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/${postType}/${postId}/undislike`,
    { method: 'POST', credentials: 'include' }
  )
    .then((res) => {
      if (!res.ok) return res.json();
    })
    .catch(console.error);
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
    .catch(console.error);
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
    .catch(console.error);
}

export async function likeEmployee(
  userId: number
): Promise<IsSuccessResponse | ErrorResponse> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/employer/like/${userId}`,
    {
      method: 'POST',
      credentials: 'include',
    }
  )
    .then((res) => res.json())
    .catch(console.error);
}

export async function unlikeEmployee(
  userId: number
): Promise<IsSuccessResponse | ErrorResponse> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/employer/like/${userId}`,
    {
      method: 'DELETE',
      credentials: 'include',
    }
  )
    .then((res) => res.json())
    .catch(console.error);
}
