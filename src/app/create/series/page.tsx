import SeriesForm from '@/components/create/series/SeriesForm';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { checkUser } from '@/service/auth';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/utils/const';
import { cookies } from 'next/headers';

export default async function CreateSeriesPage() {
  const accessToken =
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2OTciLCJhdXRoIjoiIiwiZXhwIjoxNjk3NTIxMjgzfQ.7UQz_iUKsIkYyAvmBOv4aGA2Wa7Qzvld5uWs9EVlMUvCUxctqJ4PsXJX9caPn4FIWa9Fl-buWXhg9MLrkfJpGg';
  const refreshToken = cookies().get(REFRESH_TOKEN)?.value;
  const cookie = `${ACCESS_TOKEN}=${accessToken}; ${REFRESH_TOKEN}=${refreshToken}`;

  const { id } = await checkUser(cookie);

  return (
    <LayoutWrapper paddingY="sm:py-10">
      <SeriesForm userId={id} />
    </LayoutWrapper>
  );
}
