import CoverLetterForm from '@/components/create/coverletter/CoverLetterForm';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { checkUser } from '@/service/auth';
import { ACCESS_TOKEN, MAIN_PATH, REFRESH_TOKEN } from '@/utils/const';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { cookies, headers } from 'next/headers';

export const metadata: Metadata = {
  title: '자기 소개 작성',
  description: '자기 소개를 작성하는 곳입니다.',
};

export default async function CoverLetterPage() {
  // const headersList = headers();
  // const referer = headersList.get('referer');
  // referer === null && redirect(MAIN_PATH);

  const accessToken = cookies().get(ACCESS_TOKEN)?.value;
  const refreshToken = cookies().get(REFRESH_TOKEN)?.value;
  const cookie = `${ACCESS_TOKEN}=${accessToken}; ${REFRESH_TOKEN}=${refreshToken}`;

  const { id } = await checkUser(cookie);

  return (
    <LayoutWrapper>
      <CoverLetterForm userId={id} />
    </LayoutWrapper>
  );
}
