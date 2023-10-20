export type Rank =
  | 'BRONZE_5'
  | 'BRONZE_4'
  | 'BRONZE_3'
  | 'BRONZE_2'
  | 'BRONZE_1'
  | 'SILVER_5'
  | 'SILVER_4'
  | 'SILVER_3'
  | 'SILVER_2'
  | 'SILVER_1'
  | 'GOLD_5'
  | 'GOLD_4'
  | 'GOLD_3'
  | 'GOLD_2'
  | 'GOLD_1'
  | 'PLATINUM_5'
  | 'PLATINUM_4'
  | 'PLATINUM_3'
  | 'PLATINUM_2'
  | 'PLATINUM_1'
  | 'DIAMOND_5'
  | 'DIAMOND_4'
  | 'DIAMOND_3'
  | 'DIAMOND_2'
  | 'DIAMOND_1'
  | 'INFINITY_5'
  | 'INFINITY_4'
  | 'INFINITY_3'
  | 'INFINITY_2'
  | 'INFINITY_1';

export type RankInfo = {
  myRank: Rank;
  myScore: number;
  rankInterval: number;
  rankMaxScore: number;
};

type ScoreAndCount = {
  score: number;
  count: number;
};

export type Stats = {
  memoScoreAndCount: ScoreAndCount;
  questionScoreAndCount: ScoreAndCount;
  selectingAnswerScoreAndCount: ScoreAndCount;
  answerScoreAndCount: ScoreAndCount;
  commentScoreAndCount: ScoreAndCount;
  likeScoreAndCount: ScoreAndCount;
  bestAnswerScoreAndCount: ScoreAndCount;
  memoPercent: number;
  questionPercent: number;
  selectingAnswerPercent: number;
  answerPercent: number;
  commentPercent: number;
  likePercent: number;
  bestAnswerPercent: number;
};

export type RankingInfo = {
  memberProfileEntity: {
    userId: number;
    profileImageFilePath: string;
    nickname: string;
    introduce: string;
    userTags: string[];
    followCnt: number;
    followerCnt: number;
    rank: string;
  };
  scoreRank: {
    score: number;
    rank: Rank;
    dailyScore: number;
  };
};
