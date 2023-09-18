import Header from '@/components/shared/Header';
import { getMemosDraftsByUserId } from '@/service/me';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import MeDraftContainer from '@/components/me/MeDraftContainer';
import { checkUser, getUserInfo } from '@/service/auth';
import { cookies } from 'next/headers';
import { ACCESS_TOKEN } from '@/utils/const';
import { Metadata } from 'next';

type Props = {
  params: {
    slug: number;
  };
};

export default async function MeDraftPage({ params: { slug } }: Props) {
  const cookie = cookies().get(ACCESS_TOKEN)?.value;

  const memosDraftData = getMemosDraftsByUserId(slug);
  const myData = checkUser(cookie);

  const [memos, { id, isLogin }] = await Promise.all([memosDraftData, myData]);

  const { profileImageFilePath } = isLogin
    ? await getUserInfo(id)
    : { profileImageFilePath: undefined };

  return (
    <section>
      <Header isLogin={isLogin} profileImageFilePath={profileImageFilePath} />
      <LayoutWrapper paddingY="sm:py-5">
        <MeDraftContainer memos={memos} />
      </LayoutWrapper>
    </section>
  );
}

export const metadata: Metadata = {
  title: '임시 글 목록 - Inforum',
  description: '임시 글들이 저장되어있습니다.',
};
