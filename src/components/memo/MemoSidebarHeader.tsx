import Image from 'next/image';
import Link from 'next/link';
import WhiteBtn from '../shared/btn/WhiteBtn';
import basicProfileImg from '@/assets/profile.svg';
import BarBtn from '../shared/btn/BarBtn';

type Props = {
  authorId: number;
  authorName: string;
  authorProfileImagePath: string;
  currentCategory: 'comment' | 'question' | 'recommendation';
  onCategoryBtnClick: (
    category: 'comment' | 'question' | 'recommendation'
  ) => void;
};

export default function MemoSidebarHeader({
  authorId,
  authorName,
  authorProfileImagePath,
  currentCategory,
  onCategoryBtnClick,
}: Props) {
  return (
    <div className="bg-white rounded-t-2xl sticky top-0 p-3 border-b-2 border-soma-grey-30">
      <div className="flex justify-between items-center">
        <div className="flex items-center text-sm">
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
            <div className="text-soma-grey-60 font-semibold">{authorName}</div>
          </div>
        </div>
        <WhiteBtn
          text="팔로우"
          onClick={() => {
            alert('지원 예정입니다! 개발자들이 열심히 개발하고 있어요 :)');
          }}
        />
      </div>
      <div className="flex gap-1 mt-3 mb-1">
        <BarBtn
          text="댓글"
          onClick={() => onCategoryBtnClick('comment')}
          isSelected={currentCategory === 'comment'}
        />
        <BarBtn
          text="Q&A"
          onClick={() => onCategoryBtnClick('question')}
          isSelected={currentCategory === 'question'}
        />
        {/* <BarBtn
          text="추천"
          onClick={() => {
            alert('지원 예정입니다! 개발자들이 열심히 개발하고 있어요 :)');
          }}
          isSelected={currentCategory === 'recommendation'}
        /> */}
      </div>
    </div>
  );
}
