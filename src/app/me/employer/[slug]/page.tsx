import MeEmployerContainer from '@/components/me/employer/MeEmployerContainer';
import Header from '@/components/shared/header/Header';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { getEmployees } from '@/service/employer';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/general';
import { cookies } from 'next/headers';

type Props = {
  params: {
    slug: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function MeEmployerPage({
  params: { slug },
  searchParams,
}: Props) {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value;
  const refreshToken = cookies().get(REFRESH_TOKEN)?.value;
  const cookie = `${ACCESS_TOKEN}=${accessToken}; ${REFRESH_TOKEN}=${refreshToken}`;

  const intervieweeId = Number(searchParams?.intervieweeId);
  const employees = await getEmployees(false, cookie);

  return (
    <section>
      <Header />
      <LayoutWrapper paddingY="py-0">
        <MeEmployerContainer
          employees={employees}
          intervieweeId={intervieweeId}
        />
      </LayoutWrapper>
    </section>
  );
}
