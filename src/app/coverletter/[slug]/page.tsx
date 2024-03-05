import CoverLetterContainer from '@/components/covoerletter/CoverLetterContainer';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { getUserInfo } from '@/service/auth';
import { getCoverletterInfoByUserId } from '@/service/coverletter';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/general';
import { cookies } from 'next/headers';

type Props = {
  params: {
    slug: string;
  };
};

export default async function CoverLetterPage({ params: { slug } }: Props) {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value;
  const refreshToken = cookies().get(REFRESH_TOKEN)?.value;
  const cookie = `${ACCESS_TOKEN}=${accessToken}; ${REFRESH_TOKEN}=${refreshToken}`;
  const userId = Number(slug);

  const coverletter = await getCoverletterInfoByUserId(userId, cookie);
  if ('code' in coverletter) {
    throw new Error('coverletter 정보 못불러옴');
  }

  return (
    <LayoutWrapper paddingY="sm:py-12">
      <CoverLetterContainer coverletter={coverletter} />
    </LayoutWrapper>
  );
}

export async function generateMetadata({ params: { slug } }: Props) {
  const userId = Number(slug);
  const { nickname } = await getUserInfo(userId);

  return {
    title: `자기소개서 - ${nickname}`,
    description: `${nickname}의 자기소개서입니다.`,
  };
}
