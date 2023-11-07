import { DevelopmentArea } from './coverletter';
import { InterviewState } from './mini-interview';
import { Rank } from './rank';

export type Employee = {
  userId: number;
  username: string;
  email: string;
  imagePath: string;
  rank: Rank;
  introduce: string;
  developmentArea: DevelopmentArea;
  description: string;
  techStack: string;
  isVisible: boolean;
  status: InterviewState;
};
