'use client';

import GuideEditor from '@/components/editor/components/GuideEditor';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import '@/styles/embla.css';
import { useEffect } from 'react';

const HIGHLIGHT_STYLE = 'text-soma-blue-40 font-bold';

export default function GuidePage() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, watchDrag: false }, [Autoplay({playOnInit: false})]);

  useEffect(() => {
    embla?.plugins().autoplay?.play()
  }, [embla])

  return (
    <div className="max-w-screen-lg m-auto">
      <div
        className="embla md:w-3/4 mx-auto my-3 text-sm md:text-base"
        ref={emblaRef}
      >
        <div className="embla__container text-center">
          <div className="embla__slide bg-soma-grey-20 rounded-xl">
            <span className={HIGHLIGHT_STYLE}>마크다운 문법</span>
            으로 작성해보세요!
            <br />
            즉각적으로 반영되는{' '}
            <span className={HIGHLIGHT_STYLE}>마크다운 에디터</span>
            입니다.
          </div>
          <div className="embla__slide bg-soma-grey-20 rounded-xl">
            <span className={HIGHLIGHT_STYLE}>{`\'/\'`}</span> 키를 눌러{' '}
            <span className={HIGHLIGHT_STYLE}>여러 가지 명령</span>을 해보세요!
            <br />
            이미지, 코드블럭 등을 자유롭게 사용할 수 있습니다.
          </div>
          <div className="embla__slide bg-soma-grey-20 rounded-xl">
            글을 <span className={HIGHLIGHT_STYLE}>드래그</span>하여{' '}
            <span className={HIGHLIGHT_STYLE}>다양한 스타일</span>로
            변경해보세요!
            <br />
            배경 및 글씨 색, 볼드체 및 이탤릭체 등 원하는 대로 바꿀 수 있습니다.
          </div>
          <div className="embla__slide bg-soma-grey-20 rounded-xl">
            <span className={HIGHLIGHT_STYLE}>{`\'++\'`}</span> 를 입력하여{' '}
            <span className={HIGHLIGHT_STYLE}>AI</span>를 사용해보세요!
            <br />
            <span className={HIGHLIGHT_STYLE}>생성형 AI</span>가 남은 문장을
            완성시켜줍니다.
          </div>
          {/* <div className="embla__slide bg-soma-grey-20 rounded-xl">
            간편하게 복사, 붙여넣기 하세요!
            <br />
            마크다운 에디터, 일반 에디터 모두 잘 동작합니다.
          </div> */}
          <div className="embla__slide bg-soma-grey-20 rounded-xl">
            인포럼에서 <span className={HIGHLIGHT_STYLE}>post 작성</span>하고
            커피☕️ 받아가세요!
            <br />
            <span className={HIGHLIGHT_STYLE}>개발 관련 메모 또는 질문</span>을
            작성하고 페이지 상단{' '}
            <span className={HIGHLIGHT_STYLE}>이벤트 설문조사</span>를
            참여해주시면 커피☕️를 드립니다.
          </div>
        </div>
      </div>
      <GuideEditor />
    </div>
  );
}
