import MyInfoForm from '@/components/MyInfoForm';
import { getUserInfo } from '@/service/auth';
import { getDefaultTags } from '@/service/tag';
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
  if (referer === null) redirect('/memos');

  const userInfo = await getUserInfo(slug);
  const defaultTags = await getDefaultTags();

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
