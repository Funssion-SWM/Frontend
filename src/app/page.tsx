import LandingContainer from '@/components/landing/LandingContainer';
import { checkUser } from '@/service/auth';
import { ACCESS_TOKEN, MAIN_PATH, REFRESH_TOKEN } from '@/utils/const';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function LandingPage() {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value;
  const refreshToken = cookies().get(REFRESH_TOKEN)?.value;
  const cookie = `${ACCESS_TOKEN}=${accessToken}; ${REFRESH_TOKEN}=${refreshToken}`;

  const { isLogin } = await checkUser(cookie);

  isLogin && redirect(MAIN_PATH);

  return <LandingContainer />;
}
