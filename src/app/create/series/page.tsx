import SeriesForm from '@/components/create/series/SeriesForm';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { checkUser } from '@/service/auth';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/utils/const';
import { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: '시리즈 작성',
  description: '시리즈 작성하는 곳입니다.',
};

export default async function CreateSeriesPage() {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value;
  const refreshToken = cookies().get(REFRESH_TOKEN)?.value;
  const cookie = `${ACCESS_TOKEN}=${accessToken}; ${REFRESH_TOKEN}=${refreshToken}`;

  const { id } = await checkUser(cookie);

  return (
    <LayoutWrapper paddingY="sm:py-10">
      <SeriesForm userId={id} />
    </LayoutWrapper>
  );
}
