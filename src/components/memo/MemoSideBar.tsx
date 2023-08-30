'use client';

import Image from 'next/image';
import example from '@/assets/profile.svg';
import BlueBtn2 from '@/components/shared/btn/BlueBtn2';
import CategoryBtn from '../shared/btn/CategoryBtn';
import Comments from './Comments';

export default function MemoSideBar() {
  return (
    <aside className="ml-3 rounded-lg basis-1/4 border-[1px] border-soma-grey-30 max-h-screen overflow-y-scroll">
      <div className="bg-white sticky top-0 p-3 border-b-2 border-soma-grey-30">
        <div className="flex justify-between">
          <div className="flex items-center text-xs">
            <Image
              src={example}
              alt="example"
              width={36}
              height={36}
              className="w-9 h-9"
            />
            <div className="ml-3">
              <div>nickname</div>
            </div>
          </div>
          <BlueBtn2 text="팔로우" onClick={() => {}} extraStyle="text-sm" />
        </div>
        <div className="flex gap-1 my-3">
          <CategoryBtn text="댓글✏️" onClick={() => {}} isSelected={true} />
          <CategoryBtn text="Q&A💬" onClick={() => {}} isSelected={false} />
          <CategoryBtn text="추천👍" onClick={() => {}} isSelected={false} />
        </div>
      </div>
      <Comments />
    </aside>
  );
}
