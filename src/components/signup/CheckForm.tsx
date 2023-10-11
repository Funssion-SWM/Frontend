import { useState } from 'react';
import MarkDown from '../shared/MarkDown';

type Props = {
  privacyPolicyMdText: string;
  agreementMdText: string;
  onClick: () => void;
};

export default function CheckForm({
  privacyPolicyMdText,
  agreementMdText,
  onClick,
}: Props) {
  const [isPrivacyPolicyChecked, setIsPrivacyPolicyChecked] = useState(false);
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);

  return (
    <section className="flex flex-col my-3 gap-5">
      <div className="flex flex-col gap-2">
        <div className="h-48 overflow-y-scroll text-sm break-all border-[1px] border-soma-grey-40 p-5">
          <MarkDown text={privacyPolicyMdText} />
        </div>
        <div className="flex self-end items-center">
          <input
            type="checkbox"
            id="privacyPolicy"
            onChange={(e) => setIsPrivacyPolicyChecked(e.target.checked)}
          />
          <label className="ml-1" htmlFor="privacyPolicy">
            개인정보 수집 및 이용에 동의합니다.
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-48 overflow-y-scroll text-sm break-all border-[1px] border-soma-grey-40 p-5">
          <MarkDown text={agreementMdText} />
        </div>
        <div className="flex self-end items-center">
          <input
            type="checkbox"
            id="agreement"
            onChange={(e) => setIsAgreementChecked(e.target.checked)}
          />
          <label className="ml-1" htmlFor="agreement">
            이용 정책 및 약관에 동의합니다.
          </label>
        </div>
      </div>
      <button
        className={`text-white px-3.5 py-2 rounded-3xl transition text-xs sm:text-sm ${
          !(isPrivacyPolicyChecked && isAgreementChecked)
            ? 'bg-soma-grey-40'
            : 'bg-soma-blue-40 hover:bg-soma-blue-50'
        }`}
        onClick={() => onClick()}
        disabled={!(isPrivacyPolicyChecked && isAgreementChecked)}
      >
        다음
      </button>
    </section>
  );
}
