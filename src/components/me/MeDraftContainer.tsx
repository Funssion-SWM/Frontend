'use client';

import { Memo } from '@/types/memo';
import MemosGrid from '@/components/memo/MemosGrid';

type Props = {
  memos: Memo[];
};

export default function MeDraftContainer({ memos }: Props) {
  return (
    <div>
      <p className="sm:text-lg text-soma-grey-60 font-semibold">임시저장</p>
      <MemosGrid memos={memos} colNum={4} isTemporary={true} />
    </div>
  );
}
