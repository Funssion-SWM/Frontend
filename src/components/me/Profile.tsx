import Image from 'next/image';
import basicProfileImg from '../../assets/profile.svg';
import { UserInfo } from '@/types';

type Props = {
  userInfo: UserInfo;
};

export default function Profile({ userInfo }: Props) {
  return (
    <section className="flex flex-col items-center w-full">
      <div className="text-center">
        <Image
          src={userInfo.profileImageFilePath ?? basicProfileImg}
          alt="profileImg"
          width={96}
          height={96}
          className="rounded-full w-24 h-24 object-cover"
        />
        <p className="font-bold mt-2 text-lg">{userInfo.nickname}</p>
      </div>
      <p className="p-3 rounded-md mt-1 w-full break-all text-sm overflow-y-auto text-soma-grey-60">
        {userInfo.introduce}
      </p>
      {userInfo.userTags.length !== 0 && (
        <div className="flex text-sm gap-1 mt-2 self-start overflow-x-hidden w-full">
          {userInfo.userTags.map((tag, idx) => (
            <div
              className="bg-white font-semibold px-2 py-1  text-green-500 rounded-3xl"
              key={idx}
            >
              {tag}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
