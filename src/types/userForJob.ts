import { DevelopmentArea } from './coverletter';
import { Rank } from './rank';

export type UserForJobInfo = {
  id: number;
  name: string;
  imagePath: string;
  rank: Rank;
  introduce: string;
  developmentArea: DevelopmentArea;
  techStack: string;
  description: string;
  isLike: boolean;
};
