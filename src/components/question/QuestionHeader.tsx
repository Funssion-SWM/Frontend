import LikeBox from '../shared/LikeBox';

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

      <p>...</p>
    </div>
  );
}
