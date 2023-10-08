import Link from 'next/link';
import MemoCardHeader from './MemoCardHeader';
import { Memo } from '@/types/memo';
import MemoCardFooter from './MemoCardFooter';
import MemoCardMain from './MemoCardMain';

type Props = {
  memo: Memo;
};

export default function MemoCard({
  memo: {
    memoId,
    memoTitle,
    memoDescription,
    memoColor,
    createdDate,
    authorId,
    authorName,
    authorProfileImagePath,
    likes,
    memoTags,
    repliesCount,
    questionCount,
  },
}: Props) {
  return (
    <article
      className={`flex flex-col relative rounded-md shadow-md aspect-square p-3 sm:hover:scale-105 transition ease-in-out duration-300 ${
        {
          white: 'bg-soma-white',
          yellow: 'bg-memo-yellow',
          green: 'bg-memo-green',
          skyblue: 'bg-memo-skyblue',
          orange: 'bg-memo-orange',
          pink: 'bg-memo-pink',
          navy: 'bg-memo-navy',
          purple: 'bg-memo-purple',
        }[memoColor]
      } `}
    >
      <MemoCardHeader
        createDate={createdDate}
        authorName={authorName}
        likes={likes}
        imagePath={authorProfileImagePath}
        authorId={authorId}
      />
      <MemoCardMain
        memoId={memoId}
        memoTitle={memoTitle}
        memoDescription={memoDescription}
      />
      <MemoCardFooter
        memoTags={memoTags}
        commentCount={repliesCount}
        questionCount={questionCount}
      />
    </article>
  );
}
