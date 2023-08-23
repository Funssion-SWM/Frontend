'use client';

import BlueBtn from '@/components/shared/btn/BlueBtn';
import IsValidBtn from '@/components/shared/btn/IsValidBtn';
import PromptgMessage from '@/components/shared/PromptMessage';
import { checkNickname, registerNickname } from '@/service/auth';
import { validateNickname } from '@/service/validation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  params: {
    slug: number;
  };
};

export default function SignupNicknameSettingPage({ params: { slug } }: Props) {
  const router = useRouter();
  const [nickname, setNickname] = useState('');
  const [isValidNickname, setIsValidNickname] = useState(false);

  const [messageText, setMessageText] = useState('');
  const [messageType, setMessageType] = useState(false); // true : 성공 메시지  false : 경고 메시지
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  const handleIsValidNickname = () => {
    if (!validateNickname(nickname)) {
      showMessage('닉네임 형식에 맞지 않습니다.', false);
      setIsValidNickname(false);
      return;
    }

    checkNickname(nickname).then((data) => {
      showMessage(data.message, data.valid);
      setIsValidNickname(data.valid ? true : false);
    });
  };

  const handleClick = () => {
    if (!isValidNickname) {
      showMessage('닉네임 설정에 문제가 있습니다.', false);
      return;
    }

    registerNickname(nickname, slug).then(() => {
      router.push(`/signup/setting/${slug}`);
    });
  };

  const showMessage = (text: string, type: boolean) => {
    setMessageText(text);
    setMessageType(type);
    setIsMessageVisible(true);
    setTimeout(() => {
      setIsMessageVisible(false);
    }, 2000);
  };

  return (
    <section className="flex flex-col w-full items-center max-w-screen-sm mx-auto mt-32 py-5 px-10 sm:px-32">
      <h1 className="text-3xl font-bold my-5">Inforum</h1>
      <PromptgMessage
        text={messageText}
        type={messageType}
        isVisible={isMessageVisible}
      />
      <div className="flex flex-col my-1 w-full">
        <label htmlFor="nickname" className="text-xs sm:text-sm">
          닉네임
        </label>
        <div className="flex items-center">
          <input
            className="border-2 my-2 py-2 px-4 rounded-lg bg-soma-grey-20 border-soma-grey-30 grow text-sm sm:text-base"
            type="text"
            id="nickname"
            name="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
            placeholder="4~14자리 (영어, 숫자 : 1자, 한글 : 2자)"
          />
          <IsValidBtn
            text="중복확인"
            onClick={handleIsValidNickname}
            isValid={isValidNickname}
          />
        </div>
      </div>
      <BlueBtn text="다음" onClick={handleClick} extraStyle="my-5 w-full" />
    </section>
  );
}
