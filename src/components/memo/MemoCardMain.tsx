import Link from 'next/link';

type Props = {
  memoId: number;
  memoTitle: string;
  memoDescription: string;
};

export default function MemoCardMain({
  memoId,
  memoTitle,
  memoDescription,
}: Props) {
  return (
    <Link href={`/memos/${memoId}`} className="w-full flex-1 ">
      <h2 className="text-2xl text-soma-grey-70 font-extrabold my-3 line-clamp-2 break-all h-16">
        {memoTitle}
      </h2>
      <p className="line-clamp-3 break-all my-1 text-soma-grey-60">
        {memoDescription}
      </p>
    </Link>
  );
}
