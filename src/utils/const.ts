import { DevelopmentArea } from '@/types/coverletter';
import { MemoColor } from '@/types/memo';

export const COLORS: MemoColor[] = [
  'yellow',
  'green',
  'skyblue',
  'orange',
  'pink',
  'navy',
  'purple',
  'white',
];

export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';

export const DESCRIPTION_MAX_LENGTH = 120;

export const TEMPORARY_SAVE_INTERVAL_TIME = 10000;

export const MY_TAG_MAX_COUNT = 15;

export const SEARCH_RESULT_TIME = 500;

export const MAX_PROFILE_IMAGE_BYTE = 2097152;

export const MAX_IMAGE_BYTE = 10485760;

export const MEMO_NUMBER_PER_PAGE_FOR_INFINITY_SCROLL = 20;
export const SERIES_NUMBER_PER_PAGE_FOR_INFINITY_SCROLL = 20;
export const QUESTION_NUMBER_PER_PAGE_FOR_INFINITY_SCROLL = 20;

export const MAIN_PATH = '/series';

export const developmentAreaOptions: DevelopmentArea[] = [
  'Frontend',
  'Backend',
  'AI',
  'DevOps',
];
export const stackOptions = [
  'Java',
  'JavaScript',
  'Spring',
  'Spring Boot',
  'TypeScript',
  'React',
  'Vue.js',
  'Next.js',
  'Node.js',
  'Python',
  'C',
  'C++',
  'C#',
  'PHP',
  'Kotlin',
  'Swift',
  'React Native',
  'Flutter',
  'AWS',
  'Github actions',
  'Jenkins',
];
