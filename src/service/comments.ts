import { ErrorResponse, IsSuccessResponse, PostType } from '@/types';
import { Comment, PostCommentData, PostRecoomentData } from '@/types/comment';

export async function getCommentsByPostTypeAndPostId(
  postType: PostType,
  postId: number,
  cookie?: string | undefined
) {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/comments/${postType}/${postId}`,
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
      if (!res.ok) throw new Error('error 발생!');
      return res.json();
    })
    .catch(console.error);
}

export async function createComment(
  bodyData: PostCommentData
): Promise<IsSuccessResponse | ErrorResponse> {
  return fetch(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(bodyData),
  })
    .then((res) => res.json())
    .catch(console.error);
}

export async function updateComment(
  id: number,
  commentText: string
): Promise<IsSuccessResponse | ErrorResponse> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/comments/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ commentText }),
    }
  )
    .then((res) => res.json())
    .catch(console.error);
}

export async function deleteComeent(
  id: number
): Promise<IsSuccessResponse | ErrorResponse> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/comments/${id}`,
    {
      method: 'DELETE',
      credentials: 'include',
    }
  )
    .then((res) => res.json())
    .catch(console.error);
}

export async function getRecommentsByCommentId(
  commentId: number
): Promise<Comment[]> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/comments/recomments/${commentId}`,
    {
      next: { revalidate: 0 },
      credentials: 'include',
    }
  )
    .then((res) => {
      if (!res.ok) throw new Error('error 발생!');
      return res.json();
    })
    .catch(console.error);
}

export async function createRecomment(
  bodyData: PostRecoomentData
): Promise<IsSuccessResponse | ErrorResponse> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/comments/recomments`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(bodyData),
    }
  )
    .then((res) => res.json())
    .catch(console.error);
}

export async function updateRecomment(
  id: number,
  commentText: string
): Promise<IsSuccessResponse | ErrorResponse> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/comments/recomments/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ commentText }),
    }
  )
    .then((res) => res.json())
    .catch(console.error);
}

export async function deleteRecomeent(
  id: number
): Promise<IsSuccessResponse | ErrorResponse> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/comments/recomments/${id}`,
    {
      method: 'DELETE',
      credentials: 'include',
    }
  )
    .then((res) => res.json())
    .catch(console.error);
}
