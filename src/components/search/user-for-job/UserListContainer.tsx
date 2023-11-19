import { notifyToast } from '@/service/notify';
import { getUserForJobInfos } from '@/service/userForJob';
import { DevelopmentArea } from '@/types/coverletter';
import { UserForJobInfo } from '@/types/userForJob';
import { useEffect, useState } from 'react';
import UserCard from './UserCard';
import KeywordModal from './KeywordModal';

type Props = {
  selectedDevelopmentArea: DevelopmentArea | null;
  selectedStacks: string[];
};

export default function UserListContainer({
  selectedDevelopmentArea,
  selectedStacks,
}: Props) {
  const [userList, setUserList] = useState<UserForJobInfo[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  useEffect(() => {
    getUserForJobInfos(selectedDevelopmentArea, selectedStacks).then((res) => {
      if ('code' in res) {
        notifyToast(res.message, 'error');
        return;
      }
      setUserList(res);
    });
  }, []);

  const handleRequestInterview = (userId: number) => {
    setSelectedUserId(userId);
    setIsOpen(true);
  };

  return (
    <section className="w-full mt-10 sm:mt-20">
      <h3 className={`sm:text-3xl text-xl font-bold my-5`}>User List</h3>
      <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {userList.map((userForJobInfo) => {
          return (
            <li key={userForJobInfo.id}>
              <UserCard
                userForJobInfo={userForJobInfo}
                onRequestInterview={handleRequestInterview}
              />
            </li>
          );
        })}
      </ul>
      {isOpen && (
        <KeywordModal
          onClose={() => setIsOpen(false)}
          userId={selectedUserId}
        />
      )}
    </section>
  );
}
