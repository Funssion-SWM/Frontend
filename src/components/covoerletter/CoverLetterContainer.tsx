'use client';

import { CoverletterInfo, StackInfo } from '@/types/coverletter';
import { useState } from 'react';
import BlueBtn from '../shared/btn/BlueBtn';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import MyEditor from '../editor';
import { useEditor } from '@tiptap/react';
import { handleTiptapExtensions } from '../editor/extensions';
import { handleTiptapEditorProps } from '../editor/props';

type Props = {
  coverletter: CoverletterInfo;
};

export default function CoverLetterContainer({ coverletter }: Props) {
  const { answer1, answer2, answer3, techStack, resume } = coverletter;
  const editor = useEditor({
    extensions: handleTiptapExtensions('question', undefined),
    editorProps: handleTiptapEditorProps('question', undefined),
    editable: false,
    content: JSON.parse(resume),
  });

  const parsingTechStacks: StackInfo[] = JSON.parse(techStack);

  const [page, setPage] = useState(1);

  const TITLE_STYLE = 'sm:text-xl font-semibold';
  const ANSWER_STYLE = 'bg-soma-grey-20 w-full break-all p-4 rounded-xl';
  return (
    <div>
      {page === 1 ? (
        <div>
          <div className="flex flex-col gap-10 mb-5">
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <div className={TITLE_STYLE}>
                  기술스택 (레벨정의는 우측 정보 아이콘을 확인해주세요.)
                </div>
                <div className="group mx-2 relative">
                  <AiOutlineInfoCircle />
                  <div className="absolute top-0 right-0 sm:left-0 w-[300px] sm:w-[460px] p-3 bg-white opacity-0 pointer-events-none transition-all group-hover:opacity-100 group-hover:pointer-events-auto rounded-2xl shadow-lg">
                    <ul className="flex flex-col text-xs sm:text-sm gap-3">
                      <li> 0: 개발 경험이나 기술 지식이 전혀 없음.</li>
                      <li>
                        1: 관련 지식이나 경험이 적고, 간단한 기능 구현에도
                        책/인터넷의 도움이 필요함
                      </li>
                      <li>
                        2: 능숙하진 않으나, 코드를 이해하고 필수적인 기능을
                        구현할 수 있음.
                      </li>
                      <li>
                        3: 시스템의 기본 동작 방식을 이해하고, 필수적인 기능을
                        구현하는 데 어려움이 없음. 필요한 경우 참고 자료를
                        활용하여 작업을 진행할 수 있음.
                      </li>
                      <li>
                        4: 관련 지식과 경험이 많고, 중간 규모의 시스템을 개발할
                        수 있으며, 기술적인 문제가 발생했을 때 이해하고 해결할
                        수 있는 능력이 있음
                      </li>
                      <li>
                        5: 규모가 크고 복잡한 소프트웨어 및 시스템을 개발할 수
                        있으며, 기술적 도전을 독립적으로 해결할 수 있는 능력이
                        있음. 다른 사람을 리드하고 교육할 수 있음.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <ul className="flex gap-2 overflow-x-auto h-6">
                {parsingTechStacks.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex gap-2 items-center bg-soma-grey-20 px-2 rounded-lg"
                  >
                    <p className="text-soma-blue-40 font-semibold">
                      {item.stack}
                    </p>
                    <p className="text-soma-grey-60 font-medium">
                      {item.level}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <div className={TITLE_STYLE}>자기소개</div>
              <div>
                <div>1. 프로젝트 경험에 대해 자유롭게 서술해주세요.</div>
                <p className={ANSWER_STYLE}>{answer1}</p>
              </div>
              <div>
                <div>
                  2. 어려운 기술적 문제를 해결한 경험에 대해 서술해주세요. (최대
                  500자)
                </div>
                <p className={ANSWER_STYLE}>{answer2}</p>
              </div>
              <div>
                <div>
                  3. 협업하면서 겪은 갈등이나 문제를 해결한 경험에 대해
                  서술해주세요.
                </div>
                <p className={ANSWER_STYLE}>{answer3}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-5 gap-2">
            <BlueBtn
              text="다음"
              onClick={() => {
                setPage(2);
              }}
            />
          </div>
        </div>
      ) : (
        // <CoverLetterPage2 onPrevBtnClick={() => setPage(1)} editor={editor} />

        <div>
          <div
            className={`relative flex flex-col rounded-lg shadow-lg px-2 pt-2 pb-4 min-h-screen sm:min-h-screen-150px w-full bg-soma-white`}
          >
            <MyEditor editor={editor} />
          </div>
          <div className="flex justify-end mt-5 gap-2">
            <BlueBtn
              text="이전"
              onClick={() => {
                setPage(1);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
