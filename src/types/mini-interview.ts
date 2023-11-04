export type GetInterviewQuestionResponse = {
  question1: string;
  question2: string;
  question3: string;
  status: InterviewState;
  employerId: number;
  companyName: string;
};

export type InterviewState = 'READY' | 'ING_Q1' | 'ING_Q2' | 'ING_Q3' | 'DONE';

export type InterviewResult = {
  question1: string;
  question2: string;
  question3: string;
  answer1: string;
  answer2: string;
  answer3: string;
};
