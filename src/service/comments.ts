import { PostType } from '@/types';
import { Comment, PostCommentData, PostRecoomentData } from '@/types/comment';

export async function getCommentsByPostTypeAndPostId(
  postType: PostType,
  postId: number
) {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/comments/${postType}/${postId}`,
    {
      credentials: 'include',
      next: { revalidate: 0 },
    }
  )
    .then((res) => {
      if (!res.ok) throw new Error('error 발생!');
      return res.json();
    })
    .catch(console.error);
}

export async function createComment(bodyData: PostCommentData) {
  return fetch(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/comments`, {
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
      return res.json();
    })
    .catch(console.error);
}

export async function updateComment(id: number, commentText: string) {
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
    .then((res) => {
      if (!res.ok) {
        throw new Error('error');
      }
      return res.json();
    })
    .catch(console.error);
}

export async function deleteComeent(id: number) {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/comments/${id}`,
    {
      method: 'DELETE',
      credentials: 'include',
    }
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error('error');
      }
    })
    .catch(console.error);
}

export async function getRecommentsByCommentId(
  commentId: number
): Promise<Comment[]> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/comments/recomments/${commentId}`,
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

export async function createRecomment(bodyData: PostRecoomentData) {
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
    .then((res) => {
      if (!res.ok) {
        throw new Error('error');
      }
      return res.json();
    })
    .catch(console.error);
}

export async function updateRecomment(id: number, commentText: string) {
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
    .then((res) => {
      if (!res.ok) {
        throw new Error('error');
      }
      return res.json();
    })
    .catch(console.error);
}

export async function deleteRecomeent(id: number) {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/comments/recomments/${id}`,
    {
      method: 'DELETE',
      credentials: 'include',
    }
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error('error');
      }
    })
    .catch(console.error);
}
