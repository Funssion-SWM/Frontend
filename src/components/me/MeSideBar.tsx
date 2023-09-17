import Link from 'next/link';
import Profile from './Profile';
import History from './History';
import { HistoryItem, UserInfo } from '@/types';

type Props = {
  userInfo: UserInfo;
  history: HistoryItem[];
  userId: number;
  myId: number;
};

export default function MeSideBar({ userInfo, history, userId, myId }: Props) {
  return (
    <section className="flex flex-col items-center w-full sm:w-[350px] sm:min-h-screen p-6 bg-soma-grey-20">
      <Profile userInfo={userInfo} />
      <History history={history} userId={userId} />
      {myId === Number(userId) && (
        <div className="flex flex-col mt-8">
          <Link
            href={`/me/setting/${myId}`}
            prefetch={false}
            className="text-center text-soma-grey-50 text-sm"
          >
            회원 정보 수정
          </Link>
        </div>
      )}
    </section>
  );
}
