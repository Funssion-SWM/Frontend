'use client';

import { useContext } from 'react';
import { DraftsInModalContext } from '@/context/DraftsInModalProvider';
import MemoCardTemporary from '../memo/MemoCardTemporary';

export default function Modal() {
  const { isOpen, drafts, closeDrafts } = useContext(DraftsInModalContext);

  return (
    isOpen && (
      <div className="absolute top-0">
        <Overay onClick={() => closeDrafts()} />
        <div
          className="fixed flex flex-col items-center bg-white shadow-inner rounded-2xl py-4 px-5 sm:px-20 w-full h-1/2
          top-1/2 left-1/2 transform -translate-x-1/2 gap-2"
        >
          <p className="sm:text-lg text-soma-grey-60 font-semibold">임시저장</p>
          <div className="w-full h-[2px] bg-black"></div>
          <ul
            className="flex gap-4 w-full h-full overflow-x-auto py-5"
            onClick={closeDrafts}
          >
            {drafts.map((draft) => (
              <li className="flex" key={draft.memoId}>
                <MemoCardTemporary memo={draft} delBtnIsVisible={false} />
              </li>
            ))}
          </ul>
          <button className="self-end text-xs sm:text-sm" onClick={closeDrafts}>
            나가기
          </button>
        </div>
      </div>
    )
  );
}

function Overay({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="w-screen h-screen bg-white opacity-50"
      onClick={onClick}
    ></div>
  );
}
