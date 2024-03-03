import MiniInterviewContainer from '@/components/mini-interview/MiniInterviewContainer';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import {
  continueInterview,
  getInterviewQuestions,
} from '@/service/mini-interview';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/general';
import { cookies } from 'next/headers';

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function MiniInterviewPage({ searchParams }: Props) {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value;
  const refreshToken = cookies().get(REFRESH_TOKEN)?.value;
  const cookie = `${ACCESS_TOKEN}=${accessToken}; ${REFRESH_TOKEN}=${refreshToken}`;

  const employerId = Number(searchParams?.employerId);
  const employeeId = Number(searchParams?.employeeId);

  const { question1, question2, question3, status, companyName } =
    await getInterviewQuestions(employerId, employeeId, cookie);

  const questions = [question1, question2, question3];

  let state = status;

  switch (status) {
    case 'READY':
      break;
    case 'ING_Q1':
    case 'ING_Q2':
    case 'ING_Q3':
      state = await continueInterview(employerId, cookie);
      break;
    case 'DONE':
      break;
  }
  return (
    <LayoutWrapper paddingY="sm:py-0">
      <MiniInterviewContainer
        questions={questions}
        state={state}
        employerId={employerId}
        companyName={companyName}
      />
    </LayoutWrapper>
  );
}
