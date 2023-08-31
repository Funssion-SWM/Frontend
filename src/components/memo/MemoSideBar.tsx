'use client';

import Image from 'next/image';
import BlueBtn2 from '@/components/shared/btn/BlueBtn2';
import CategoryBtn from '../shared/btn/CategoryBtn';
import Comments from './Comments';
import Link from 'next/link';
import { HEIGHT_TO_REMOVE_FOR_FIT_SCREEN } from '@/utils/const';
import basicProfileImg from '@/assets/profile.svg';

type Props = {
  authorName: string;
  authorProfileImagePath: string;
  authorId: number;
};

const SIDE_BAR_WIDTH = '300px';

export default function MemoSideBar({
  authorName,
  authorProfileImagePath,
  authorId,
}: Props) {
  return (
    <aside
      className={`ml-3 sticky top-24 rounded-lg basis-1/4 border-[1px] border-soma-grey-30 max-h-[calc(100vh-${HEIGHT_TO_REMOVE_FOR_FIT_SCREEN})] overflow-y-scroll min-w-[${SIDE_BAR_WIDTH}]`}
    >
      <div className="bg-white sticky top-0 p-3 border-b-2 border-soma-grey-30">
        <div className="flex justify-between items-center">
          <div className="flex items-center text-xs">
            <Link href={`/me/${authorId}`}>
              <Image
                src={authorProfileImagePath ?? basicProfileImg}
                alt="profileImg"
                width={36}
                height={36}
                className="w-9 h-9 rounded-full border-2"
              />
            </Link>
            <div className="ml-3">
              <div className="text-soma-grey-60 font-medium">{authorName}</div>
            </div>
          </div>
          <BlueBtn2
            text="팔로우"
            onClick={() => {
              alert('지원 예정입니다! 개발자들이 열심히 개발하고 있어요 :)');
            }}
            extraStyle="text-sm"
          />
        </div>
        <div className="flex gap-1 my-3">
          <CategoryBtn text="댓글✏️" onClick={() => {}} isSelected={true} />
          <CategoryBtn
            text="Q&A💬"
            onClick={() => {
              alert('지원 예정입니다! 개발자들이 열심히 개발하고 있어요 :)');
            }}
            isSelected={false}
          />
          <CategoryBtn
            text="추천👍"
            onClick={() => {
              alert('지원 예정입니다! 개발자들이 열심히 개발하고 있어요 :)');
            }}
            isSelected={false}
          />
        </div>
      </div>
      <Comments />
    </aside>
  );
}
