import { checkUser } from '@/service/auth';
import { ACCESS_TOKEN, MAIN_PATH, REFRESH_TOKEN } from '@/utils/const';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LandingMain from '@/components/landing/LandingMain';
import DescriptionBox from '@/components/landing/DescriptionBox';
import LastNaigator from '@/components/landing/LastNaigator';
import Footer from '@/components/shared/Footer';
import autocomplete from '@/assets/autocomplete.gif';
import mypage from '@/assets/mypage.gif';
import editing from '@/assets/edit-memo.gif';
import hire from '@/assets/hire.gif';
import editUnderline from '@/assets/icons/edit_underline.svg';
import speechBubble from '@/assets/icons/speech_bubble.svg';
import infinity from '@/assets/icons/rank/infinity_1.svg';
import wheel from '@/assets/icons/wheel_icon.svg';

export default async function LandingPage() {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value;
  const refreshToken = cookies().get(REFRESH_TOKEN)?.value;
  const cookie = `${ACCESS_TOKEN}=${accessToken}; ${REFRESH_TOKEN}=${refreshToken}`;

  const { isLogin } = await checkUser(cookie);

  isLogin && redirect(MAIN_PATH);

  return (
    <section>
      <LandingMain />
      <div className="flex flex-col max-w-screen-xl gap-20 py-20 mx-auto sm:py-60 sm:gap-60">
        <DescriptionBox
          title1="생성형 AI를 활용한"
          title2="텍스트 자동 생성 기능"
          description1="++ 명령어를 입력해 텍스트를 자동 생성해보세요!"
          description2="글을 다 작성하면 자동생성된 요약과 태그를 제공합니다!"
          subImgAlt="speech-bubble"
          mainImgAlt="autocomplete"
          subImg={speechBubble}
          mainImg={autocomplete}
        />
        <DescriptionBox
          title1="블럭 기반 에디터를 활용한"
          title2="간편한 에디팅 기능"
          description1="/ 키와 드래그를 이용하여 다양한 편집 기능을 사용해보세요!"
          description2="바로 반영되는 마크다운 문법을 사용해보세요!"
          subImgAlt="edit-underline"
          mainImgAlt="editing"
          subImg={editUnderline}
          mainImg={editing}
          reverse
        />
        <DescriptionBox
          title1="즐겁고, 꾸준하게"
          title2="Post Motivation"
          description1="Post History 기능으로 꾸준하게 작성해보세요!"
          description2="메모 작성, 답변 채택 등 다양한 활동을 통해 등급을 올려보세요!"
          subImgAlt="infinity"
          mainImgAlt="mypage"
          subImg={infinity}
          mainImg={mypage}
        />
        <DescriptionBox
          title1="신속하고 편리한"
          title2="채용 도우미 서비스"
          description1="원하는 직무의 개발자를 인포럼에서 찾아보세요!"
          description2="키워드에 맞는 질문을 자동 생성해 미니면접을 진행해보세요!"
          subImgAlt="wheel"
          mainImgAlt="hire"
          subImg={wheel}
          mainImg={hire}
          reverse
        />
      </div>
      <LastNaigator />
      <Footer extraClass="w-full sm:snap-always sm:snap-end bg-white" />
    </section>
  );
}
