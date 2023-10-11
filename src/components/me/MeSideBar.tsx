import Profile from './Profile';
import History from './History';
import { HistoryItem, UserInfo } from '@/types';
import Setting from './Setting';

type Props = {
  userInfo: UserInfo;
  history: HistoryItem[];
  userId: number;
  myId: number;
  myUserInfo: UserInfo;
};

export default function MeSideBar({
  userInfo,
  history,
  userId,
  myId,
  myUserInfo,
}: Props) {
  return (
    <section className="flex flex-col items-center w-full sm:w-[350px] sm:min-h-screen p-6 bg-soma-grey-20">
      <Profile
        userInfo={userInfo}
        userId={userId}
        isMine={myId === Number(userId)}
        myUserInfo={myUserInfo}
      />
      <History history={history} userId={userId} />
      {myId === Number(userId) && <Setting myId={myId} />}
    </section>
  );
}
