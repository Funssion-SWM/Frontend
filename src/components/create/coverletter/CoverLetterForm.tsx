'use client';

import BlueBtn from '@/components/shared/btn/BlueBtn';
import { notifyToast } from '@/service/notify';
import { ChangeEvent, useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';

const TITLE_STYLE = 'sm:text-lg font-semibold';

const TEXTAREA_STYLE =
  'bg-soma-grey-20 w-full resize-none h-32 break-all p-4 outline-none rounded-xl';

type StackInfo = {
  stack: string;
  level: number;
};

const stackOptions = ['Java', 'JavaScript', 'Python', 'C', 'C++'];
const levelOptions = [0, 1, 2, 3, 4, 5];

export default function CoverLetterForm() {
  const [stackInfos, setStackInfos] = useState<StackInfo[]>([]);
  const [stackInfo, setStackInfo] = useState<StackInfo>({
    stack: stackOptions[0],
    level: levelOptions[0],
  });
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [answer3, setAnswer3] = useState('');

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
      stack: stackOptions[0],
      level: levelOptions[0],
    });
  };

  const handleDeleteStackInfo = (stack: string) => {
    setStackInfos(stackInfos.filter((stackInfo) => stackInfo.stack !== stack));
  };

  return (
    <div>
      <div className="flex flex-col gap-1 mb-5">
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
                  1: 관련 지식이나 경험이 적고, 간단한 기능 구현에도 책/인터넷의
                  도움이 필요함
                </li>
                <li>
                  2: 능숙하진 않으나, 코드를 이해하고 필수적인 기능을 구현할 수
                  있음.
                </li>
                <li>
                  3: 시스템의 기본 동작 방식을 이해하고, 필수적인 기능을
                  구현하는 데 어려움이 없음. 필요한 경우 참고 자료를 활용하여
                  작업을 진행할 수 있음.
                </li>
                <li>
                  4: 관련 지식과 경험이 많고, 중간 규모의 시스템을 개발할 수
                  있으며, 기술적인 문제가 발생했을 때 이해하고 해결할 수 있는
                  능력이 있음
                </li>
                <li>
                  5: 규모가 크고 복잡한 소프트웨어 및 시스템을 개발할 수 있으며,
                  기술적 도전을 독립적으로 해결할 수 있는 능력이 있음. 다른
                  사람을 리드하고 교육할 수 있음.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center bg-soma-grey-20 pl-2 gap-2 rounded-lg">
            <label>Stack</label>
            <select
              className="outline-none text-center bg-soma-grey-30 rounded-lg p-1"
              value={stackInfo.stack}
              name="stack"
              onChange={handleOptionsChange}
            >
              {stackOptions.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center bg-soma-grey-20 pl-2 gap-2 rounded-lg">
            <label>Level</label>
            <select
              className="outline-none text-center bg-soma-grey-30 rounded-lg p-1"
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
            className="bg-soma-blue-40 text-white w-6 h-6 text-sm rounded-md"
            onClick={handleAddStackInfo}
          >
            +
          </button>
        </div>

        <ul className="flex gap-2 overflow-x-auto h-6">
          {stackInfos.map((item, idx) => (
            <li
              key={idx}
              className="flex gap-2 items-center bg-soma-grey-20 px-2 rounded-lg"
            >
              <p className="text-soma-blue-40 font-semibold">{item.stack}</p>
              <p className="text-soma-grey-60 font-medium">{item.level}</p>
              <button
                className="bg-soma-grey-40 text-white w-5 h-5 text-sm rounded-md"
                onClick={() => handleDeleteStackInfo(item.stack)}
              >
                -
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className={TITLE_STYLE}>자기소개</div>
        <div>
          <div>1. 프로젝트 경험에 대해 자유롭게 서술해주세요. (최대 500자)</div>
          <textarea
            className={TEXTAREA_STYLE}
            value={answer1}
            onChange={(e) => {
              if (e.target.value.length > 500) {
                return;
              }
              setAnswer1(e.target.value);
            }}
          ></textarea>
          <div className="text-end text-sm">{answer1.length}/500</div>
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
                return;
              }
              setAnswer2(e.target.value);
            }}
          ></textarea>
          <div className="text-end text-sm">{answer2.length}/500</div>
        </div>
        <div>
          <div>
            3. 협업하면서 겪은 갈등이나 문제를 해결한 경험에 대해 서술해주세요.
            (최대 500자)
          </div>
          <textarea
            className={TEXTAREA_STYLE}
            value={answer3}
            onChange={(e) => {
              if (e.target.value.length > 500) {
                return;
              }
              setAnswer3(e.target.value);
            }}
          ></textarea>
          <div className="text-end text-sm">{answer3.length}/500</div>
        </div>
      </div>

      <div className="flex justify-end mt-5">
        <BlueBtn text="등록" onClick={() => {}} />
      </div>
    </div>
  );
}
