import Profile from './Profile';
import History from './History';
import { HistoryItem, UserInfo } from '@/types';
import Setting from './Setting';
import { RankInfo, Stats } from '@/types/rank';
import ScoreDetailProvider from '@/context/ScoreDetailProvider';
import ScoreDetailModal from './ScoreDetailModal';
import CoverLetterOpenToggle from './CoverLetterOpenToggle';

type Props = {
  userInfo: UserInfo;
  history: HistoryItem[];
  userId: number;
  myId: number;
  myUserInfo: UserInfo;
  userRankInfo: RankInfo;
  userStats: Stats;
  dailyScore: number;
  isCoverletterCreated: boolean;
  coverletterIsVisible: boolean;
};

export default function MeSideBar({
  userInfo,
  history,
  userId,
  myId,
  myUserInfo,
  userRankInfo,
  userStats,
  dailyScore,
  isCoverletterCreated,
  coverletterIsVisible,
}: Props) {
  return (
    <section className="flex flex-col items-center w-full sm:w-[350px] sm:min-h-screen p-6 bg-soma-grey-20">
      <ScoreDetailProvider>
        <Profile
          userInfo={userInfo}
          userId={userId}
          isMine={myId === Number(userId)}
          myUserInfo={myUserInfo}
          userRankInfo={userRankInfo}
          dailyScore={dailyScore}
        />
        <ScoreDetailModal userStats={userStats} />
      </ScoreDetailProvider>
      <History history={history} userId={userId} />
      {myId === Number(userId) && (
        <Setting myId={myId} isCoverletterCreated={isCoverletterCreated} />
      )}
      {myId === Number(userId) && isCoverletterCreated && (
        <CoverLetterOpenToggle coverletterIsVisible={coverletterIsVisible} />
      )}
    </section>
  );
}
