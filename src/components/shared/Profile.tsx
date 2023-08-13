import Image from 'next/image';
import basicProfileImg from '../../assets/profile.svg';
import { UserInfo2 } from '@/types';

type Props = {
  userInfo: UserInfo2;
};

export default function Profile({ userInfo }: Props) {
  return (
    <section className="flex flex-col items-center">
      <div className="text-center">
        <Image
          src={userInfo.profileImageFilePath ?? basicProfileImg}
          alt="profileImg"
          width={96}
          height={96}
          className="rounded-full w-24 h-24 object-cover"
        />
        <p className="font-bold mt-1">{userInfo.nickname}</p>
        {/* <p>15301</p> */}
      </div>
      <div className="self-start mt-5 w-full">
        <h3 className="font-semibold">자기소개</h3>
        <p className="bg-soma-blue-5 p-3 rounded-md mt-1 w-full text-sm h-[150px] overflow-scroll text-soma-grey-60">
          {userInfo.introduce}
        </p>
      </div>
    </section>
  );
}
