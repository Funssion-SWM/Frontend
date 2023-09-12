'use client';

import Image from 'next/image';
import Link from 'next/link';
import WhiteBtn from '../shared/btn/WhiteBtn';
import CategoryBtn from '../shared/btn/CategoryBtn';
import basicProfileImg from '@/assets/profile.svg';

type Props = {
  authorId: number;
  authorName: string;
  authorProfileImagePath: string;
};

export default function MemoSidebarHeader({
  authorId,
  authorName,
  authorProfileImagePath,
}: Props) {
  return (
    <div className="bg-white rounded-t-2xl sticky top-0 p-3 border-b-2 border-soma-grey-30">
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
        <WhiteBtn
          text="팔로우"
          onClick={() => {
            alert('지원 예정입니다! 개발자들이 열심히 개발하고 있어요 :)');
          }}
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
  );
}
