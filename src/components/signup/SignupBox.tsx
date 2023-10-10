'use client';

import { useState } from 'react';
import CheckForm from './CheckForm';
import SignupForm from './SignupForm';

type Props = {
  privacyPolicyMdText: string;
  agreementMdText: string;
};

export default function SignupBox({
  privacyPolicyMdText,
  agreementMdText,
}: Props) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="w-full">
      {agreed ? (
        <SignupForm />
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
