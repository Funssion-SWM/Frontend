import { Memo } from '@/types';
import MemoCard from './MemoCard';

type Props = {
  memos: Memo[];
  colNum: number;
};

export default function MemosGrid({ memos, colNum }: Props) {
  return (
    <ul
      className={`grid gap-4 my-5 grid-cols-1 
    ${
      {
        3: 'md:grid-cols-2 lg:grid-cols-3',
        4: 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
      }[colNum]
    }
    `}
    >
      {memos.map((memo) => (
        <li key={memo.memoId}>
          <MemoCard memo={memo} />
        </li>
      ))}
    </ul>
  );
}
