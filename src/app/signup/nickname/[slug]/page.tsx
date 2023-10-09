import NicknameForm from '@/components/signup/NicknameForm';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

type Props = {
  params: {
    slug: number;
  };
};

export default function SignupNicknameSettingPage({ params: { slug } }: Props) {
  const headersList = headers();
  const referer = headersList.get('referer');
  referer === null && redirect('/memos');

  return <NicknameForm userId={Number(slug)} />;
}
