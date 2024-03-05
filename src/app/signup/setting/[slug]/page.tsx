import MyInfoForm from '@/components/MyInfoForm';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { getDefaultTags } from '@/service/tag';
import logo from '@/assets/images/inforum_logo.png';
import Image from 'next/image';
import { MAIN_PATH } from '@/constants/general';

type Props = {
  params: {
    slug: number;
  };
};

export default async function SignupSettingPage({ params: { slug } }: Props) {
  const headersList = headers();
  const referer = headersList.get('referer');

  if (referer === null) redirect(MAIN_PATH);

  const defaultTags = await getDefaultTags();

  return (
    <section className="flex flex-col items-center w-full max-w-screen-sm px-10 py-5 mx-auto sm:px-16">
      <Image src={logo} alt="logo" width={160} className="my-2" />
      <MyInfoForm userId={slug} isSignup={true} defaultTags={defaultTags} />
    </section>
  );
}
