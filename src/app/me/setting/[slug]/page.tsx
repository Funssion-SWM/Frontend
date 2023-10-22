import MyInfoForm from '@/components/MyInfoForm';
import { getUserInfo } from '@/service/auth';
import { getDefaultTags } from '@/service/tag';
import { MAIN_PATH } from '@/utils/const';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

type Props = {
  params: {
    slug: number;
  };
};

export default async function MySettingPage({ params: { slug } }: Props) {
  const headersList = headers();
  const referer = headersList.get('referer');
  if (referer === null) redirect(MAIN_PATH);

  const userData = getUserInfo(slug);
  const defaultTagsData = getDefaultTags();

  const [userInfo, defaultTags] = await Promise.all([
    userData,
    defaultTagsData,
  ]);

  return (
    <section className="flex flex-col w-full items-center max-w-screen-sm mx-auto mt-7 py-5 px-10 sm:px-32">
      <MyInfoForm
        userId={slug}
        userInfo={userInfo}
        isSignup={false}
        defaultTags={defaultTags}
      />
    </section>
  );
}

export const metadata: Metadata = {
  title: '회원 정보 수정',
  description: '회원 정보 수정 페이지입니다.',
};
