import Header from '@/components/shared/Header';
import { getMemosDraftsByUserId } from '@/service/me';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import MeDraftContainer from '@/components/me/MeDraftContainer';
import { checkUser, getUserInfo } from '@/service/auth';
import { cookies } from 'next/headers';
import { ACCESS_TOKEN, MAIN_PATH, REFRESH_TOKEN } from '@/utils/const';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getNotificationsTop30 } from '@/service/notification';

type Props = {
  params: {
    slug: number;
  };
};

export default async function MeDraftPage({ params: { slug } }: Props) {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value;
  const refreshToken = cookies().get(REFRESH_TOKEN)?.value;
  const cookie = `${ACCESS_TOKEN}=${accessToken}; ${REFRESH_TOKEN}=${refreshToken}`;

  const memosDraftData = getMemosDraftsByUserId(slug);
  const myData = checkUser(cookie);

  const [memos, { id, isLogin, authority }] = await Promise.all([
    memosDraftData,
    myData,
  ]);

  const { profileImageFilePath } = isLogin
    ? await getUserInfo(id)
    : { profileImageFilePath: undefined };

  const notifications = isLogin ? await getNotificationsTop30(cookie) : [];

  id !== Number(slug) && redirect(MAIN_PATH);

  return (
    <section>
      <Header
        isLogin={isLogin}
        notifications={notifications}
        profileImageFilePath={profileImageFilePath}
        authority={authority}
      />
      <LayoutWrapper paddingY="sm:py-5">
        <MeDraftContainer memos={memos} isMine={id === Number(slug)} />
      </LayoutWrapper>
    </section>
  );
}

export const metadata: Metadata = {
  title: '임시 글 목록 - 인포럼',
  description: '임시 글들이 저장되어있습니다.',
};
