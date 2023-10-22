import Link from 'next/link';
import TagsList from '../shared/TagsList';
import TagView from '../shared/TagView';

type Props = {
  tags: string[];
  memoId: number;
  memoTitle: string;
};

export default function QuestionFooter({ tags, memoId, memoTitle }: Props) {
  return (
    <div className="flex justify-between text-xs sm:text-sm">
      <div className="flex flex-wrap gap-1">
        {tags.map((tag, idx) => (
          <TagView key={idx} tagText={tag} />
        ))}
      </div>
      {/* <TagsList tags={tags} /> */}
      {memoId !== 0 && (
        <p className="my-auto">
          메모{` `}
          <Link
            href={`/memos/${memoId}`}
            className="text-soma-blue-40 hover:text-soma-blue-50 transition-all"
            prefetch={false}
          >{`${memoTitle} `}</Link>
          에 대한 질문
        </p>
      )}
    </div>
  );
}
