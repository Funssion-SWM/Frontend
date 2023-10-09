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
      <p className="sm:text-lg text-soma-grey-60 font-semibold mb-3 ml-2">
        임시저장
      </p>
      <MemosGrid memos={memos} colNum={4} isTemporary={true} isMine={isMine} />
    </div>
  );
}
