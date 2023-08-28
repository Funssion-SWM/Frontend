'use client';

import { Memo } from '@/types/memo';
import MemosGrid from '@/components/memo/MemosGrid'
import CategoryBtn from '@/components/shared/btn/CategoryBtn';
// import CategoryBtn from '../shared/btn/CategoryBtn';

type Props = {
  memos: Memo[];
};

export default function MeDraftContainer({ memos }: Props) {

  return (
    <div>
      <div className="flex gap-2 mb-5">
        <CategoryBtn
          text="Memo"
          onClick={() => {}}
          isSelected={true}
        />
      </div>
      <MemosGrid memos={memos} colNum={4} />
    </div>
  );
}
