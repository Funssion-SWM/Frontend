'use client';

import BlueBtn from '@/components/shared/btn/BlueBtn';
import { useState } from 'react';

const TITLE_STYLE = 'text-lg font-semibold';

const TEXTAREA_STYLE =
  'bg-soma-grey-20 w-full resize-none h-36 text-lg break-all p-4 outline-none rounded-xl';

export default function CoverLetterForm() {
  const [answer1, setAnswer1] = useState('');
  const [answer2, setAnswer2] = useState('');
  const [answer3, setAnswer3] = useState('');

  return (
    <div>
      <div className="mb-5">
        <div className={TITLE_STYLE}>
          기술스택 레벨 (자신있는 기술스택의 레벨을 정의해주세요.)
        </div>
        <div className="flex gap-5">
          <div className="flex gap-2">
            <div>JavaScript</div>
            <div>level5</div>
          </div>
          <div className="flex gap-2">
            <div>TypeScript</div>
            <div>level5</div>
          </div>
          <div className="flex gap-2">
            <div>JavaScript</div>
            <div>level5</div>
          </div>
        </div>
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
