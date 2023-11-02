import { ErrorResponse } from '@/types';
import {
  GetInterviewQuestionResponse,
  InterviewState,
} from '@/types/mini-interview';

export async function getInterviewQuestions(
  employerId: number,
  employeeId: number,
  cookie?: string
): Promise<GetInterviewQuestionResponse> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/interview/questions/${employerId}/${employeeId}`,
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

export async function startInterview(
  employerId: number
): Promise<void | ErrorResponse> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/interview/start/${employerId}`,
    {
      method: 'PUT',
      credentials: 'include',
    }
  )
    .then((res) => res.json())
    .catch(console.error);
}

export async function postAnswer(
  employerId: number,
  questionNumber: number,
  answer: string
) {
  const bodyData = {
    employerId,
    questionNumber,
    answer,
  };
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/interview/answers`,
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

export async function continueInterview(
  employerId: number,
  cookie?: string
): Promise<InterviewState> {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/interview/continue/${employerId}`,
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
