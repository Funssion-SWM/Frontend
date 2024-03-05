'use client';

import { useState } from 'react';
import CheckForm from './CheckForm';
import SignupForm from './SignupForm';
import { useSearchParams } from 'next/navigation';
import { UserType } from '@/types/common';

type Props = {
  privacyPolicyMdText: string;
  agreementMdText: string;
};

export default function SignupBox({
  privacyPolicyMdText,
  agreementMdText,
}: Props) {
  const [agreed, setAgreed] = useState(false);
  const loginType =
    (useSearchParams()?.get('login-type') as UserType) ?? ('user' as UserType);

  return (
    <div className="w-full">
      {agreed ? (
        <SignupForm loginType={loginType} />
      ) : (
        <CheckForm
          privacyPolicyMdText={privacyPolicyMdText}
          agreementMdText={agreementMdText}
          onClick={() => setAgreed(true)}
        />
      )}
    </div>
  );
}
