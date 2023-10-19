import Profile from './Profile';
import History from './History';
import { HistoryItem, UserInfo } from '@/types';
import Setting from './Setting';
import { RankInfo } from '@/types/rank';

type Props = {
  userInfo: UserInfo;
  history: HistoryItem[];
  userId: number;
  myId: number;
  myUserInfo: UserInfo;
  userRankInfo: RankInfo;
};

export default function MeSideBar({
  userInfo,
  history,
  userId,
  myId,
  myUserInfo,
  userRankInfo,
}: Props) {
  return (
    <section className="flex flex-col items-center w-full sm:w-[350px] sm:min-h-screen p-6 bg-soma-grey-20">
      <Profile
        userInfo={userInfo}
        userId={userId}
        isMine={myId === Number(userId)}
        myUserInfo={myUserInfo}
        userRankInfo={userRankInfo}
      />
      <History history={history} userId={userId} />
      {myId === Number(userId) && <Setting myId={myId} />}
    </section>
  );
}
