import { PostType } from '@/types';

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
