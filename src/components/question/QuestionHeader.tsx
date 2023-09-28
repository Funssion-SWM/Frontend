import Image from 'next/image';
import LikeBox from '../shared/LikeBox';
import more from '@/assets/icons/more.svg';

export default function QuestionHeader() {
  return (
    <div className="flex justify-end">
      <LikeBox
        likeNum={10}
        postId={-1}
        isLike={true}
        postType="question"
        iconSize={20}
      />
      <button onClick={() => {}} className="ml-2">
        <Image src={more} alt="more" />
      </button>
    </div>
  );
}
