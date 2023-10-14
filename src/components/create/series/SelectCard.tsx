import { Memo } from '@/types/memo';
import { useState } from 'react';
import { AiFillCheckCircle, AiOutlineCheckCircle } from 'react-icons/ai';

type Props = {
  memo: Memo;
  onClick: (selected: boolean, memo: Memo) => void;
};

export default function SelectCard({ memo, onClick }: Props) {
  const [selected, setSelected] = useState(false);
  const { memoTitle, memoDescription, memoColor } = memo;

  const handleClick = () => {
    setSelected((pre) => !pre);
    onClick(selected, memo);
  };

  return (
    <article
      className={`flex flex-col relative rounded-md shadow-md aspect-square p-2 ${
        selected ? 'brightness-75' : ''
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
      } `}
      onClick={handleClick}
    >
      <div className="self-end text-soma-blue-40">
        {selected ? (
          <AiFillCheckCircle className="w-5 h-5" />
        ) : (
          <AiOutlineCheckCircle className="w-5 h-5" />
        )}
      </div>
      <div className="w-full flex-1">
        <h2 className="text-xl text-soma-grey-70 font-extrabold my-3 line-clamp-2 break-all h-14">
          {memoTitle}
        </h2>
        <p className="line-clamp-3 text-sm break-all my-1 text-soma-grey-60">
          {memoDescription}
        </p>
      </div>
    </article>
  );
}
