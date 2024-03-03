import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/inforum_logo.png';
import { join } from 'path';
import fs from 'fs';
import SignupBox from '@/components/signup/SignupBox';
import { MAIN_PATH } from '@/constants/general';

export const metadata: Metadata = {
  title: '회원가입',
  description: '회원가입을 하는 곳입니다.',
};

export default function SignupPage() {
  const PrivacyPolicyMarkdownPath = join(
    process.cwd(),
    'src/assets/markdown/privacy_policy.md'
  );
  const AgreementyMarkdownPath = join(
    process.cwd(),
    'src/assets/markdown/agreement.md'
  );
  const PrivacyPolicyMarkdownText = fs.readFileSync(
    PrivacyPolicyMarkdownPath,
    'utf8'
  );
  const AgreementyMarkdownText = fs.readFileSync(
    AgreementyMarkdownPath,
    'utf8'
  );

  return (
    <section className="relative flex flex-col w-full items-center max-w-screen-sm mx-auto mt-12 py-5 px-10 sm:px-32">
      <Link
        href={MAIN_PATH}
        className="absolute top-2 right-4 text-soma-grey-50 text-sm sm:text-base"
      >
        메인으로
      </Link>
      <Image src={logo} alt="logo" width={200} className="my-5" />
      <SignupBox
        privacyPolicyMdText={PrivacyPolicyMarkdownText}
        agreementMdText={AgreementyMarkdownText}
      />
    </section>
  );
}
