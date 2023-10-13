import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { ExampleCardType } from './MemoOrderContainer';

type Props = {
  card: ExampleCardType;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
};

export const ItemTypes = {
  CARD: 'card',
};

export default function MemoDndCard({ card, index, moveCard }: Props) {
  const { id, text, memoColor } = card;

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
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`flex flex-col relative rounded-md w-[150px] shadow-md cursor-move aspect-square p-3 transition ease-in-out duration-300${
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
      <p className="line-clamp-2"> {text}</p>
    </div>
  );
}
