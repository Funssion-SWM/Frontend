'use client';

import { Memo } from '@/types/memo';
import MemosGrid from '@/components/memo/MemosGrid';

type Props = {
  memos: Memo[];
  isMine: boolean;
};

export default function MeDraftContainer({ memos, isMine }: Props) {
  return (
    <div>
      <p className="sm:text-lg text-soma-grey-60 font-semibold  text-center w-full">
        임시저장
      </p>
      <div className="w-full h-[2px] bg-soma-grey-60 my-3"></div>
      <MemosGrid memos={memos} colNum={4} isTemporary={true} isMine={isMine} />
    </div>
  );
}
