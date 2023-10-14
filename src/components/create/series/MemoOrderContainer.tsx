import MemoDndCard from './MemoDndCard';
import { Memo } from '@/types/memo';

type Props = {
  memos: Memo[];
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  onDeleteBtnClick: (id: number) => void;
};

export default function MemoOrderContainer({
  memos,
  moveCard,
  onDeleteBtnClick,
}: Props) {
  return (
    <ul className="flex gap-3 overflow-x-auto h-48 items-center bg-soma-grey-10 px-3 rounded-lg">
      {memos.map((memo, idx) => (
        <li key={memo.memoId}>
          <MemoDndCard
            memo={memo}
            index={idx}
            moveCard={moveCard}
            onDeleteBtnClick={onDeleteBtnClick}
          />
        </li>
      ))}
    </ul>
  );
}
