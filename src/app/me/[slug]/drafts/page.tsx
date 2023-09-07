import Header from '@/components/shared/Header';
import { getMemosDraftsByUserId } from '@/service/me';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import MeDraftContainer from '@/components/me/MeDraftContainer';
import { checkUser, getUserInfo } from '@/service/auth';
import { cookies } from 'next/headers';
import { ACCESS_TOKEN } from '@/utils/const';

type Props = {
  params: {
    slug: number;
  };
};

export default async function MeDraftPage({ params: { slug } }: Props) {
  const memos = await getMemosDraftsByUserId(slug);
  const { id, isLogin } = await checkUser(cookies().get(ACCESS_TOKEN)?.value);
  const userInfo = id !== -1 ? await getUserInfo(id) : undefined;

  return (
    <section>
      <Header
        isLogin={isLogin}
        profileImageFilePath={userInfo?.profileImageFilePath}
      />
      <LayoutWrapper paddingY="sm:py-5">
        <MeDraftContainer memos={memos} />
      </LayoutWrapper>
    </section>
  );
}
