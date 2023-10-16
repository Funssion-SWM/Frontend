import { ErrorResponse, IsSuccessResponse } from '@/types';
import { PostImageResponse } from '@/types/image';
import { PostQuestionData, Question, QuestionOrderBy } from '@/types/question';

export async function getQuestions(
  orderBy: QuestionOrderBy = 'NEW'
): Promise<Question[]> {
  const url = new URL(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/questions`);
  const params = { orderBy: orderBy };
  url.search = new URLSearchParams(params).toString();
  return fetch(url, { next: { revalidate: 0 } })
    .then((res) => {
      if (!res.ok) throw new Error('error 발생!');
      return res.json();
    })
    .catch(console.error);
}

export async function getQuestionById(
  id: number,
  cookie?: string | undefined
): Promise<Question> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/questions/${id}`,
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

export async function getQuestionsByMemoId(
  memoId: number
): Promise<Question[]> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/questions/memo?memoId=${memoId}`,
    {
      next: { revalidate: 0 },
    }
  )
    .then((res) => res.json())
    .catch(console.error);
}

export async function createQuestion(
  bodyData: PostQuestionData,
  memoId: number
): Promise<Question | ErrorResponse> {
  const url = new URL(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/questions`);
  if (memoId) {
    const params = { memoId: memoId.toString() };
    url.search = new URLSearchParams(params).toString();
  }

  return fetch(url, {
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

export async function updateQuestion(
  bodyData: PostQuestionData,
  id: number
): Promise<Question | ErrorResponse> {
  return fetch(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/questions/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(bodyData),
  })
    .then((res) => res.json())
    .catch(console.error);
}

export async function deleteQuestion(
  id: number
): Promise<IsSuccessResponse | ErrorResponse> {
  return fetch(`${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/questions/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  })
    .then((res) => res.json())
    .catch(console.error);
}

export async function postImageInQuestion(
  image: File
): Promise<PostImageResponse | ErrorResponse> {
  const formdata = new FormData();
  formdata.append('image', image);
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/questions/image`,
    {
      method: 'POST',
      body: formdata,
      credentials: 'include',
    }
  )
    .then((res) => {
      if (res.status === 413) {
        return { code: 413, message: '이미지 크기가 10MB를 초과하였습니다.' };
      }
      return res.json();
    })
    .catch(console.error);
}
