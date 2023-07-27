import { Memo } from '@/service/memos';
import MemoCard from './MemoCard';

type Props = {
  memos: Memo[];
};

export default function MemosGrid({ memos }: Props) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-5">
      {memos.map((memo) => (
        <li key={memo.memoId}>
          <MemoCard memo={memo} />
        </li>
      ))}
    </ul>
  );
}
