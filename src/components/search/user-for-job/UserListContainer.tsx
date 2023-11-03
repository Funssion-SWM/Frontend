import { notifyToast } from '@/service/notify';
import { getUserForJobInfos } from '@/service/userForJob';
import { DevelopmentArea } from '@/types/coverletter';
import { UserForJobInfo } from '@/types/userForJob';
import { useEffect, useState } from 'react';
import UserCard from './UserCard';

type Props = {
  selectedDevelopmentArea: DevelopmentArea | null;
  selectedStacks: string[];
};

export default function UserListContainer({
  selectedDevelopmentArea,
  selectedStacks,
}: Props) {
  const [userList, setUserList] = useState<UserForJobInfo[]>([]);

  useEffect(() => {
    getUserForJobInfos(selectedDevelopmentArea, selectedStacks).then((res) => {
      if ('code' in res) {
        notifyToast(res.message, 'error');
        return;
      }
      setUserList(res);
    });
  }, []);

  return (
    <section className="w-full mt-10 sm:mt-20">
      <div className={`sm:text-3xl text-xl font-bold my-5`}>User List</div>
      <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {userList.map((userForJobInfo) => {
          return (
            <li key={userForJobInfo.id}>
              <UserCard userForJobInfo={userForJobInfo} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
