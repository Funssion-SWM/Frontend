import { useState } from 'react';
import MemoDndCard from './MemoDndCard';

export type ExampleCardType = {
  id: number;
  text: string;
  memoColor: string;
};

export default function MemoOrderContainer() {
  const [cards, setCards] = useState<ExampleCardType[]>([
    {
      id: 1,
      text: '이펙티브 자바 1',
      memoColor: 'yellow',
    },
    {
      id: 2,
      text: '이펙티브 자바 5',
      memoColor: 'green',
    },
    {
      id: 3,
      text: '이펙티브 자바 2',
      memoColor: 'orange',
    },
    {
      id: 4,
      text: '이펙티브 자바 3',
      memoColor: 'pink',
    },
    {
      id: 5,
      text: '이펙티브 자바 6',
      memoColor: 'navy',
    },
    {
      id: 6,
      text: '이펙티브 자바 7',
      memoColor: 'navy',
    },
  ]);
  const moveCard = (dragIndex: number, hoverIndex: number) => {
    setCards((prevCards) => {
      const arr = [...prevCards];
      const elementToMove = arr[dragIndex];
      arr.splice(dragIndex, 1);
      arr.splice(hoverIndex, 0, elementToMove);
      return arr;
    });
  };

  return (
    <ul className="flex gap-3 overflow-x-auto h-48 items-center bg-soma-grey-10 px-3 rounded-lg">
      {cards.map((card, idx) => (
        <li key={card.id}>
          <MemoDndCard card={card} index={idx} moveCard={moveCard} />
        </li>
      ))}
    </ul>
  );
}
