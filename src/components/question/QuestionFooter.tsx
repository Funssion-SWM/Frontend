import Link from 'next/link';
import TagsList from '../shared/TagsList';

type Props = {
  tags: string[];
  memoId: number;
  memoTitle: string;
};

export default function QuestionFooter({ tags, memoId, memoTitle }: Props) {
  return (
    <div className="flex justify-between text-xs sm:text-sm">
      <TagsList tags={tags} />
      {memoId !== 0 && (
        <div>
          {'메모 '}
          <Link
            href={`/memos/${memoId}`}
            className="text-soma-blue-40 hover:text-soma-blue-50 transition-all"
            prefetch={false}
          >{`${memoTitle} `}</Link>
          에 대한 질문
        </div>
      )}
    </div>
  );
}
