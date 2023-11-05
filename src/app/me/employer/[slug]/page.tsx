import MeEmployerContainer from '@/components/me/employer/MeEmployerContainer';
import Header from '@/components/shared/Header';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { checkUser, getUserInfo } from '@/service/auth';
import { getEmployees } from '@/service/employer';
import { getNotificationsTop30 } from '@/service/notification';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/utils/const';
import { cookies } from 'next/headers';

type Props = {
  params: {
    slug: string;
  };
};

export default async function MeEmployerPage({ params: { slug } }: Props) {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value;
  const refreshToken = cookies().get(REFRESH_TOKEN)?.value;
  const cookie = `${ACCESS_TOKEN}=${accessToken}; ${REFRESH_TOKEN}=${refreshToken}`;
  const userId = Number(slug);

  const { id, isLogin, authority } = await checkUser(cookie);
  const myUserInfo = await getUserInfo(id);

  const notifications = isLogin ? await getNotificationsTop30(cookie) : [];

  const employees = await getEmployees(false, cookie);
  console.log(employees)

  return (
    <section>
      <Header
        isLogin={isLogin}
        notifications={notifications}
        profileImageFilePath={myUserInfo?.profileImageFilePath}
        authority={authority}
      />
      <LayoutWrapper paddingY="py-0">
        <MeEmployerContainer employees={employees} />
      </LayoutWrapper>
    </section>
  );
}
