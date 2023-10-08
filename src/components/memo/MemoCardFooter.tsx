import TagsList from '../shared/TagsList';

type Props = {
  memoTags: string[];
  commentCount: number;
};

export default function MemoCardFooter({ memoTags, commentCount }: Props) {
  return (
    <div className="flex justify-between items-center text-sm h-10 ">
      <TagsList tags={memoTags} />
      <div className="w-14 text-end">
        <p className="text-xs text-soma-grey-50">{commentCount}개의 댓글</p>
        {/* <p className="text-xs text-soma-grey-60">0개의 질문</p> */}
      </div>
    </div>
  );
}
