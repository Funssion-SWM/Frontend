import { MemoInfo } from '@/types/series';
import MemoDndCard from './MemoDndCard';

type Props = {
  memos: MemoInfo[];
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  onDeleteBtnClick: (id: number) => void;
};

export default function MemoOrderContainer({
  memos,
  moveCard,
  onDeleteBtnClick,
}: Props) {
  return (
    <ul className="flex gap-3 overflow-x-auto h-48 max-w-[925px] items-center bg-soma-grey-20 px-3 rounded-lg">
      {memos.map((memo, idx) => (
        <li key={memo.id}>
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
