import { Memo } from '@/types/memo';
import MemoCard from './MemoCard';
import MemoCardTemporary from './MemoCardTemporary';

type Props = {
  memos: Memo[];
  colNum: number;
  isTemporary?: boolean;
};

export default function MemosGrid({
  memos,
  colNum,
  isTemporary = false,
}: Props) {
  return (
    <ul
      className={`grid gap-4 grid-cols-1 
    ${
      {
        2: 'lg:grid-cols-2',
        3: 'md:grid-cols-2 lg:grid-cols-3',
        4: 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
      }[colNum]
    }
    `}
    >
      {memos?.map((memo) => (
        <li key={memo.memoId}>
          {isTemporary ? (
            <MemoCardTemporary memo={memo} />
          ) : (
            <MemoCard memo={memo} />
          )}
        </li>
      ))}
    </ul>
  );
}
