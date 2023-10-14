import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Memo } from '@/types/memo';
import { AiOutlineMinusCircle } from 'react-icons/ai';

type Props = {
  memo: Memo;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  onDeleteBtnClick: (id: number) => void;
};

export const ItemTypes = {
  CARD: 'card',
};

export default function MemoDndCard({
  memo,
  index,
  moveCard,
  onDeleteBtnClick,
}: Props) {
  const { memoId, memoTitle, memoColor, memoDescription } = memo;

  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      // Determine mouse position
      const clientOffset: any = monitor.getClientOffset();
      // Get pixels to the left
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;

      // Dragging right
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }
      // Dragging left
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.CARD,
    item: { memoId, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`flex flex-col relative rounded-md w-32 shadow-md cursor-move aspect-square p-3 transition ease-in-out duration-300${
        isDragging ? 'opacity-0' : 'opacity-100'
      } ${
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
      }`}
      data-handler-id={handlerId}
    >
      <p className="line-clamp-2 font-semibold text-sm break-all text-soma-grey-70 h-10">
        {memoTitle}
      </p>
      <p className="line-clamp-2 text-xs break-all text-soma-grey-60 mt-2">
        {memoDescription}
      </p>
      <button
        className="absolute -top-2 -right-2"
        onClick={() => onDeleteBtnClick(memoId)}
      >
        <AiOutlineMinusCircle className="text-soma-blue-40 w-5 h-5" />
      </button>
    </div>
  );
}
