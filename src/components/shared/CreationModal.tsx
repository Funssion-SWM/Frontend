'use client';

import { CreationModalContext } from '@/context/CreationModalProvider';
import Link from 'next/link';
import { useContext } from 'react';

const LINK_STYLE =
  'w-40 h-40 sm:w-52 sm:h-52 flex justify-center shadow-lg rounded-full items-center bg-white hover:bg-soma-grey-30 hover:shadow-none border-[1px] border-soma-grey-30 transition-all ease-in font-semibold text-soma-blue-40';

export default function CreationModal() {
  const { isOpen, closeCreationModal } = useContext(CreationModalContext);

  return (
    isOpen && (
      <div className="fixed top-0 z-10">
        <Overay onClick={() => closeCreationModal()} />
        <div
          className="fixed flex flex-col items-center rounded-2xl p-2 sm:p-10 
top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-2 sm:text-2xl"
        >
          <div className="flex gap-10 flex-col sm:flex-row">
            <Link
              href="/create/memo"
              onClick={() => closeCreationModal()}
              className={LINK_STYLE}
            >
              메모
            </Link>
            <Link
              href="/create/question"
              onClick={() => closeCreationModal()}
              className={LINK_STYLE}
            >
              질문
            </Link>
            <Link
              href="/create/series"
              onClick={() => closeCreationModal()}
              className={LINK_STYLE}
            >
              시리즈
            </Link>
          </div>
        </div>
      </div>
    )
  );
}

function Overay({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="w-screen h-screen bg-white opacity-80"
      onClick={onClick}
    ></div>
  );
}
