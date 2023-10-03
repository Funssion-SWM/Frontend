import { Answer } from '@/types/answer';

export async function getAnswersByQuestionId(
  questionId: number
): Promise<Answer[]> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/answers?questionId=${questionId}`,
    {
      next: { revalidate: 0 },
    }
  )
    .then((res) => res.json())
    .catch(console.error);
}

export async function createAnswer(
  questionId: number,
  text: string,
  description: string
) {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/answers?questionId=${questionId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ text, description }),
    }
  )
    .then((res) => res.json())
    .catch(console.error);
}

export async function updateAnswer(
  answerId: number,
  text: string,
  description: string
) {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/answers/${answerId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ text, description }),
    }
  )
    .then((res) => res.json())
    .catch(console.error);
}

export async function deleteQuestion(answerId: number) {
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
