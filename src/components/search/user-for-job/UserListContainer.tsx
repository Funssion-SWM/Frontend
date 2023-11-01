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

const dummyData: UserForJobInfo[] = [
  {
    id: 1,
    name: 'dongree',
    imagePath: '',
    rank: 'DIAMOND_3',
    introduce: '안녕하세요~~~~',
    developmentArea: 'Frontend',
    techStack: "['react','javascript','typescript]",
    description: '',
  },
  {
    id: 2,
    name: 'dongree',
    imagePath: '',
    rank: 'DIAMOND_3',
    introduce: '안녕하세요~~~~',
    developmentArea: 'Frontend',
    techStack: "['react','javascript','typescript]",
    description: '',
  },
  {
    id: 3,
    name: 'dongree',
    imagePath: '',
    rank: 'DIAMOND_3',
    introduce: '안녕하세요~~~~',
    developmentArea: 'Frontend',
    techStack: "['react','javascript','typescript]",
    description: '',
  },
];

export default function UserListContainer({
  selectedDevelopmentArea,
  selectedStacks,
}: Props) {
  const [userList, setUserList] = useState<UserForJobInfo[]>([]);

  useEffect(() => {
    console.log(selectedStacks);
    getUserForJobInfos(selectedDevelopmentArea, selectedStacks).then((res) => {
      console.log(res);
      if ('code' in res) {
        notifyToast(res.message, 'error');
        return;
      }
      setUserList(res);
      console.log(res);
    });
  }, []);

  return (
    <section className="w-full">
      <div className={`sm:text-4xl text-lg font-bold`}>User List</div>
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
