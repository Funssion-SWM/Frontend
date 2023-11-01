export type SetCoverletterRequest = {
  introduce: string;
  techStack: string;
  developmentArea: DevelopmentArea | null;
  answer1: string;
  answer2: string;
  answer3: string;
  resume: string;
};

export type CoverletterInfo = {
  introduce: string;
  techStack: string;
  developmentArea: DevelopmentArea | null;
  answer1: string;
  answer2: string;
  answer3: string;
  description: string;
  resume: string;
};

export type StackInfo = {
  stack: string;
  level: number;
};

export type DevelopmentArea = 'Frontend' | 'Backend' | 'AI' | 'DevOps';
