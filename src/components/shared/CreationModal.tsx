'use client';

import { CreationModalContext } from '@/context/CreationModalProvider';
import Link from 'next/link';
import { useContext } from 'react';

const LINK_STYLE =
  'p-10 bg-white rounded-sm hover:bg-soma-grey-30 border-[1px] border-soma-grey-30 transition-all ease-in';

export default function CreationModal() {
  const { isOpen, closeCreationModal } = useContext(CreationModalContext);

  return (
    isOpen && (
      <div className="absolute top-0">
        <Overay onClick={() => closeCreationModal()} />
        <div
          className="fixed flex flex-col shadow-lg items-center bg-white rounded-2xl p-2 sm:p-3 
top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-2 "
        >
          <div className="flex gap-2">
            <Link
              href="/create/memo"
              onClick={() => closeCreationModal()}
              className={LINK_STYLE}
            >
              메모 작성
            </Link>
            <Link
              href="/create/question"
              onClick={() => closeCreationModal()}
              className={LINK_STYLE}
            >
              질문 작성
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
      className="w-screen h-screen bg-white opacity-50"
      onClick={onClick}
    ></div>
  );
}
