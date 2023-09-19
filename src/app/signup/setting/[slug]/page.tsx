import MyInfoForm from '@/components/MyInfoForm';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { getDefaultTags } from '@/service/tag';
import logo from '@/assets/inforum_logo.png';
import Image from 'next/image';

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

  return (
    <section className="flex flex-col w-full items-center max-w-screen-sm mx-auto py-5 px-10 sm:px-16">
      <Image src={logo} alt="logo" width={200} />
      <MyInfoForm userId={slug} isSignup={true} defaultTags={defaultTags} />
    </section>
  );
}
