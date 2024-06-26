'use client';

import BlueBtn from '@/components/shared/btn/BlueBtn';
import { notifyToast } from '@/utils/notify';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { AiOutlineInfoCircle } from '@react-icons/all-files/ai/AiOutlineInfoCircle';
import CoverLetterPage2 from './CoverLetterPage2';
import { DevelopmentArea, StackInfo } from '@/types/coverletter';
import {
  createCoverletter,
  getCoverletterInfoByUserId,
  updateCoverletter,
} from '@/service/coverletter';
import { useEditor } from '@tiptap/react';
import { handleTiptapExtensions } from '@/lib/editor/extensions';
import { handleTiptapEditorProps } from '@/lib/editor/props';
import { useRouter } from 'next/navigation';
import { DEVELOPMENT_AREA_OPTIONS, STACK_OPTIONS } from '@/constants/general';
import { ModalContext } from '@/context/ModalProvider';

const TITLE_STYLE = 'sm:text-xl font-semibold my-1';

const TEXTAREA_STYLE =
  'bg-soma-grey-20 w-full resize-none h-32 break-all p-4 outline-none rounded-xl';

type Props = {
  userId: number;
};

const levelOptions = [0, 1, 2, 3, 4, 5];

export default function CoverLetterForm({ userId }: Props) {
  const [introduce, setIntrodunce] = useState<string>('');
  const [stackInfos, setStackInfos] = useState<StackInfo[]>([]);
  const [stackInfo, setStackInfo] = useState<StackInfo>({
    stack: STACK_OPTIONS[0],
    level: levelOptions[0],
  });
  const [developmentArea, setDevelopmentArea] =
    useState<DevelopmentArea | null>(null);
  const [answer1, setAnswer1] = useState<string>('');
  const [answer2, setAnswer2] = useState<string>('');
  const [answer3, setAnswer3] = useState<string>('');

  const [page, setPage] = useState(1);
  const [isCreated, setIsCreated] = useState(true);
  const router = useRouter();
  const { open } = useContext(ModalContext);

  const editor = useEditor({
    extensions: handleTiptapExtensions('coverletter', userId),
    editorProps: handleTiptapEditorProps('coverletter', userId),
    autofocus: 'end',
    onCreate: (e) => {
      getCoverletterInfoByUserId(userId).then((res) => {
        if ('code' in res) {
          if (res.code === 404) {
            setIsCreated(false);
            return;
          }
          notifyToast(res.message, 'error');
          return;
        }
        const {
          introduce,
          answer1,
          answer2,
          answer3,
          techStack,
          resume,
          developmentArea,
        } = res;
        setIntrodunce(introduce);
        setAnswer1(answer1);
        setAnswer2(answer2);
        setAnswer3(answer3);
        setStackInfos(JSON.parse(techStack));
        setDevelopmentArea(developmentArea);
        e.editor.commands.setContent(JSON.parse(resume));
      });
    },
  });

  const handleOptionsChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target;
    setStackInfo((info) => {
      return { ...info, [name]: value };
    });
  };

  const handleAddStackInfo = () => {
    const stackArr = stackInfos.map((stackInfo) => stackInfo.stack);
    if (stackArr.includes(stackInfo.stack)) {
      notifyToast('이미 포함된 기술스택입니다.', 'warning');
      return;
    }

    setStackInfos((preInfos) => [...preInfos, stackInfo]);
    setStackInfo({
      stack: STACK_OPTIONS[0],
      level: levelOptions[0],
    });
  };

  const handleDeleteStackInfo = (stack: string) => {
    setStackInfos(stackInfos.filter((stackInfo) => stackInfo.stack !== stack));
  };

  const handleSave = async () => {
    const coverletterInfo = {
      introduce,
      techStack: JSON.stringify(stackInfos),
      developmentArea: developmentArea,
      answer1,
      answer2,
      answer3,
      resume: JSON.stringify(editor?.getJSON()),
    };
    let fn = isCreated
      ? updateCoverletter(coverletterInfo)
      : createCoverletter(coverletterInfo);

    fn.then((res) => {
      if (res) {
        notifyToast(res.message, 'error');
        return;
      }
      router.push(`/me/${userId}`);
    });
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      return (e.returnValue = '');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  });

  return (
    <div className="relative">
      {page === 1 ? (
        <div>
          <div className="flex flex-col gap-10 mb-5">
            <div className="flex flex-col gap-1">
              <div className={TITLE_STYLE}>개발 분야</div>
              <ul className="flex gap-3">
                {DEVELOPMENT_AREA_OPTIONS.map((item, idx) => {
                  return (
                    <li
                      key={idx}
                      className={`py-1 px-2 cursor-pointer rounded-lg hover:bg-soma-blue-40 hover:text-white transition-all ${
                        item === developmentArea
                          ? 'bg-soma-blue-40 text-white'
                          : 'bg-soma-grey-20'
                      }`}
                      onClick={() => {
                        if (item === developmentArea) {
                          setDevelopmentArea(null);
                        } else {
                          setDevelopmentArea(item);
                        }
                      }}
                    >
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <div className={TITLE_STYLE}>
                  기술스택 (레벨정의는 우측 정보 아이콘을 확인해주세요.)
                </div>
                <div className="relative mx-2 group">
                  <AiOutlineInfoCircle />
                  <div className="absolute top-0 right-0 sm:left-0 w-[300px] sm:w-[460px] p-3 bg-white opacity-0 pointer-events-none transition-all group-hover:opacity-100 group-hover:pointer-events-auto rounded-2xl shadow-lg">
                    <ul className="flex flex-col gap-3 text-xs sm:text-sm">
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

              <div className="flex items-center gap-5">
                <div className="flex items-center gap-2 pl-2 rounded-lg bg-soma-grey-20">
                  <label>Stack</label>
                  <select
                    className="p-1 text-center rounded-lg outline-none bg-soma-grey-30"
                    value={stackInfo.stack}
                    name="stack"
                    onChange={handleOptionsChange}
                  >
                    {STACK_OPTIONS.map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2 pl-2 rounded-lg bg-soma-grey-20">
                  <label>Level</label>
                  <select
                    className="p-1 text-center rounded-lg outline-none bg-soma-grey-30"
                    value={stackInfo.level}
                    name="level"
                    onChange={handleOptionsChange}
                  >
                    {levelOptions.map((level, idx) => (
                      <option key={idx} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  className="w-6 h-6 text-sm text-white rounded-md bg-soma-blue-40"
                  onClick={handleAddStackInfo}
                >
                  +
                </button>
              </div>

              <ul className="flex h-6 gap-2 overflow-x-auto">
                {stackInfos.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 px-2 rounded-lg bg-soma-grey-20"
                  >
                    <p className="font-semibold text-soma-blue-40">
                      {item.stack}
                    </p>
                    <p className="font-medium text-soma-grey-60">
                      {item.level}
                    </p>
                    <button
                      className="w-5 h-5 text-sm text-white rounded-md bg-soma-grey-40"
                      onClick={() => handleDeleteStackInfo(item.stack)}
                    >
                      -
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div>
                <div className={TITLE_STYLE}>한 줄 소개</div>
                <div>
                  <input
                    type="text"
                    className="w-full px-4 py-2 outline-none bg-soma-grey-20 rounded-xl"
                    value={introduce}
                    onChange={(e) => {
                      if (e.target.value.length > 50) {
                        notifyToast(
                          '제한 글자 수를 초과하였습니다.',
                          'warning'
                        );
                        return;
                      }
                      setIntrodunce(e.target.value);
                    }}
                    placeholder="한 줄 소개 (채용자한테 간단히 소개되어 보여집니다.)"
                  />
                  <div className="text-sm text-end">{introduce.length}/50</div>
                </div>
              </div>
              <div>
                <div className={TITLE_STYLE}>공통 질문</div>
                <div>
                  1. 프로젝트 경험에 대해 자유롭게 서술해주세요. (최대 500자)
                </div>
                <textarea
                  className={TEXTAREA_STYLE}
                  value={answer1}
                  onChange={(e) => {
                    if (e.target.value.length > 500) {
                      notifyToast('제한 글자 수를 초과하였습니다.', 'warning');
                      return;
                    }
                    setAnswer1(e.target.value);
                  }}
                ></textarea>
                <div className="text-sm text-end">{answer1.length}/500</div>
              </div>
              <div>
                <div>
                  2. 어려운 기술적 문제를 해결한 경험에 대해 서술해주세요. (최대
                  500자)
                </div>
                <textarea
                  className={TEXTAREA_STYLE}
                  value={answer2}
                  onChange={(e) => {
                    if (e.target.value.length > 500) {
                      notifyToast('제한 글자 수를 초과하였습니다.', 'warning');
                      return;
                    }
                    setAnswer2(e.target.value);
                  }}
                ></textarea>
                <div className="text-sm text-end">{answer2.length}/500</div>
              </div>
              <div>
                <div>
                  3. 협업하면서 겪은 갈등이나 문제를 해결한 경험에 대해
                  서술해주세요. (최대 500자)
                </div>
                <textarea
                  className={TEXTAREA_STYLE}
                  value={answer3}
                  onChange={(e) => {
                    if (e.target.value.length > 500) {
                      notifyToast('제한 글자 수를 초과하였습니다.', 'warning');
                      return;
                    }
                    setAnswer3(e.target.value);
                  }}
                ></textarea>
                <div className="text-sm text-end">{answer3.length}/500</div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-5">
            <BlueBtn text="저장" onClick={handleSave} />
            <BlueBtn
              text="다음"
              onClick={() => {
                setPage(2);
              }}
            />
          </div>
        </div>
      ) : (
        <CoverLetterPage2
          onPrevBtnClick={() => setPage(1)}
          onSaveBtnClick={handleSave}
          editor={editor}
        />
      )}
      <button
        className="absolute top-0 right-0 text-soma-grey-50"
        onClick={() =>
          open(
            '나가시겠습니까? 나가면 수정했던 정보는 저장되지 않습니다.',
            () => {
              router.back();
            }
          )
        }
      >
        나가기
      </button>
    </div>
  );
}
