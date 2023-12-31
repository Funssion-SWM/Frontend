'use client';

import Image from 'next/image';
import basicProfileImg from '../../assets/profile.svg';
import { UserInfo } from '@/types';
import FollowBtn from './FollowBtn';
import CountInfo from './CountInfo';
import MyProgressBar from '../shared/MyProgressBar';
import { RankInfo } from '@/types/rank';
import RankWithBadge from '../shared/RankWithBadge';
import { calcRankPercentage } from '@/service/rank';
import { useContext } from 'react';
import { ScoreDetailContext } from '@/context/ScoreDetailProvider';

type Props = {
  userInfo: UserInfo;
  userId: number;
  isMine: boolean;
  myUserInfo: UserInfo;
  userRankInfo: RankInfo;
  dailyScore: number;
};

export default function Profile({
  userInfo,
  userId,
  isMine,
  myUserInfo,
  userRankInfo: { myRank, myScore, rankInterval, rankMaxScore },
  dailyScore,
}: Props) {
  const { openScoreDetail } = useContext(ScoreDetailContext);

  return (
    <section className="flex flex-col items-center w-full">
      <div className="flex flex-col items-center mb-3">
        <Image
          src={userInfo.profileImageFilePath ?? basicProfileImg}
          alt="profileImg"
          width={96}
          height={96}
          className="rounded-full w-24 h-24 object-cover"
        />
        <p className="font-bold mt-2 text-lg">{userInfo.nickname}</p>
        <RankWithBadge rank={myRank} />
        <div className="flex items-center text-soma-grey-60 ">
          <div className="text-sm">{myScore}점</div>
        </div>
      </div>
      <MyProgressBar
        rank={myRank}
        rankMinScore={rankMaxScore - rankInterval}
        rankMaxScore={rankMaxScore}
        currentRankPercentage={calcRankPercentage(
          /*numerator = */ rankInterval - (rankMaxScore - myScore),
          /*denominator = */ rankInterval
        )}
      />
      <div className="flex justify-between self-stretch text-xs text-soma-grey-49">
        <div>{dailyScore}/200</div>
        {myScore !== 0 && (
          <button className="" onClick={() => openScoreDetail()}>
            자세히 보기
          </button>
        )}
      </div>

      <CountInfo isMine={isMine} />
      <p className="px-3 py-2 rounded-md w-full break-all text-sm overflow-y-auto text-soma-grey-60">
        {userInfo.introduce}
      </p>
      {userInfo.userTags.length !== 0 && (
        <div className="flex text-sm gap-1 mt-2 self-start overflow-x-hidden w-full">
          {userInfo.userTags.map((tag, idx) => (
            <div
              className="bg-white font-semibold px-2 py-1  text-green-500 rounded-3xl somablue"
              key={idx}
            >
              {tag}
            </div>
          ))}
        </div>
      )}
      {!isMine && (
        <FollowBtn
          isFollowed={userInfo.isFollowed}
          userId={userId}
          myUserInfo={myUserInfo}
        />
      )}
    </section>
  );
}
