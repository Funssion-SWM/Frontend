import { FollowProvider } from '@/context/MeContextProvider';
import { checkUser, getUserInfo } from '@/service/auth';
import { getFollowers, getFollows } from '@/service/follow';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/utils/const';
import { cookies } from 'next/headers';

export default async function MeLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}) {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value;
  const refreshToken = cookies().get(REFRESH_TOKEN)?.value;
  const cookie = `${ACCESS_TOKEN}=${accessToken}; ${REFRESH_TOKEN}=${refreshToken}`;

  const userData = getUserInfo(Number(params.slug));
  const followData = getFollows(params.slug);
  const followerData = getFollowers(params.slug);
  const myData = checkUser(cookie);

  const [userInfo, follows, followers, {id}] = await Promise.all([
    userData,
    followData,
    followerData,
    myData
  ]);

  return (
    <FollowProvider initialFollowCnt={userInfo.followCnt} initialFollowerCnt={userInfo.followerCnt} followData={follows} followerData={followers} idData={id}>
      {children}
    </FollowProvider>
  );
}
