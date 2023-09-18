type Props = {
  memoTags: string[];
  commentCount: number;
};

export default function MemoCardFooter({ memoTags, commentCount }: Props) {
  return (
    <div className="flex justify-between items-center text-sm">
      <div className="flex items-center gap-1 h-10 flex-1 overflow-x-hidden">
        {memoTags.map((item, idx) => (
          <div
            className="font-semibold bg-soma-grey-10 text-soma-blue-40 rounded-3xl py-1 px-2 line-clamp-1"
            key={idx}
          >
            {item}
          </div>
        ))}
      </div>
      <div className="w-14 text-end">
        <p className="text-xs text-soma-grey-50">{commentCount}개의 댓글</p>
        {/* <p className="text-xs text-soma-grey-60">0개의 질문</p> */}
      </div>
    </div>
  );
}
