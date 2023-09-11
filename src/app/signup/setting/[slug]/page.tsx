import MyInfoForm from '@/components/MyInfoForm';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { getDefaultTags } from '@/service/tag';

type Props = {
  params: {
    slug: number;
  };
};

export default async function SignupSettingPage({ params: { slug } }: Props) {
  const headersList = headers();
  const referer = headersList.get('referer');

  if (referer === null) redirect('/memos');

  const defaultTags = await getDefaultTags();
  console.log(defaultTags);

  return (
    <section className="flex flex-col w-full items-center max-w-screen-sm mx-auto py-5 px-10 sm:px-16">
      <h1 className="text-3xl font-bold my-5">Inforum</h1>
      <MyInfoForm userId={slug} isSignup={true} defaultTags={defaultTags} />
    </section>
  );
}
