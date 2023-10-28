'use client'

import GuideEditor from "@/components/editor/components/GuideEditor";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import "@/styles/embla.css";

export default function GuidePage() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()])

  return (
    <div className="max-w-screen-lg m-auto bg-soma-grey-10">
      <div className="embla md:w-3/4 mx-auto my-4 text-sm md:text-base" ref={emblaRef}>
        <div className="embla__container text-center">
          <div className="embla__slide bg-soma-blue-20 rounded-xl">
            마크다운 문법으로 작성해보세요!<br/>
            즉각적으로 반영되는 마크다운 에디터입니다
          </div>
          <div className="embla__slide bg-soma-blue-20 rounded-xl">
            '/' 키를 눌러 여러 가지 방법으로 작성해보세요!<br/>
            이미지, 코드블럭 등을 자유롭게 사용할 수 있습니다
          </div>
          <div className="embla__slide bg-soma-blue-20 rounded-xl">
            글을 드래그하여 다양한 스타일로 변경해보세요!<br/>
            배경 및 글씨 색, 볼드체 및 이탤릭체 등 원하는 대로 바꿀 수 있습니다.
          </div>
          <div className="embla__slide bg-soma-blue-20 rounded-xl">
            '++' 버튼을 눌러 AI를 사용해보세요!<br/>
            ChatGPT 가 남은 문장을 완성시켜줍니다.
          </div>
          <div className="embla__slide bg-soma-blue-20 rounded-xl">
            간편하게 복사, 붙여넣기 하세요!<br/>
            마크다운 에디터, 일반 에디터 모두 잘 동작합니다
          </div>
          <div className="embla__slide bg-soma-blue-20 rounded-xl">
            인포럼에서 개발 메모 작성하고 커피 받아가세요!<br/>
            개발 관련 메모를 작성하고 페이지 상단 이벤트 설문조사를 참여해주시면 커피를 드립니다.
          </div>
        </div>
      </div>

      <GuideEditor />
    </div>
  )
}

