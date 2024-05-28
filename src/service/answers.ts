import { ErrorResponse, IsSuccessResponse } from '@/types/common';
import { Answer } from '@/types/answer';
import { PostImageResponse } from '@/types/image';

export async function getAnswersByQuestionId(
  questionId: number,
  cookie?: string | undefined
): Promise<Answer[]> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/answers?questionId=${questionId}`,
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
    .then((res) => res.json())
    .catch(console.error);
}

export async function createAnswer(
  questionId: number,
  text: string
): Promise<IsSuccessResponse | ErrorResponse> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/answers?questionId=${questionId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ text }),
    }
  )
    .then((res) => res.json())
    .catch(console.error);
}

export async function updateAnswer(
  answerId: number,
  text: string
): Promise<IsSuccessResponse | ErrorResponse> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/answers/${answerId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ text }),
    }
  )
    .then((res) => res.json())
    .catch(console.error);
}

export async function deleteAnswer(
  answerId: number
): Promise<IsSuccessResponse | ErrorResponse> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/answers/${answerId}`,
    {
      method: 'DELETE',
      credentials: 'include',
    }
  )
    .then((res) => res.json())
    .catch(console.error);
}

export async function postImageInAnswer(
  image: File
): Promise<PostImageResponse | ErrorResponse> {
  const formdata = new FormData();
  formdata.append('image', image);
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/answers/image`,
    {
      method: 'POST',
      body: formdata,
      credentials: 'include',
    }
  )
    .then((res) => {
      if (res.status === 413) {
        return { code: 413, message: '이미지 크기가 5MB를 초과하였습니다.' };
      }
      return res.json();
    })
    .catch(console.error);
}

export async function selectAnswer(
  questionId: number,
  answerId: number
): Promise<IsSuccessResponse | ErrorResponse> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/answers/select/${questionId}?answerId=${answerId}`,
    {
      method: 'PATCH',
      credentials: 'include',
    }
  )
    .then((res) => res.json())
    .catch(console.error);
}
