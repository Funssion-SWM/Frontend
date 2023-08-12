import MyInfoForm from '@/components/MyInfoForm';
import { getUserInfo2 } from '@/service/auth';

type Props = {
  params: {
    slug: number;
  };
};

export default async function MySettingPage({ params: { slug } }: Props) {
  const userInfo = await getUserInfo2(slug);

  return (
    <section className="flex flex-col w-full items-center max-w-screen-sm mx-auto mt-24 shadow-lg py-5 px-32">
      <h1 className="text-3xl font-bold my-5">Inforum</h1>
      <MyInfoForm userId={slug} userInfo={userInfo} isSignup={false} />
    </section>
  );
}
