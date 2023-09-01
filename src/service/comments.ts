import { PostType } from '@/types';
import { PostCommentData } from '@/types/comment';

export async function getCommentsByPostTypeAndPostId(
  postType: PostType,
  postId: number
) {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/comments/${postType}/${postId}`,
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
