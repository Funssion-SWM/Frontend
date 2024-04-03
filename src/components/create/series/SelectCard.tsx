import { Memo } from '@/types/memo';
import { useState } from 'react';
import { AiFillCheckCircle } from '@react-icons/all-files/ai/AiFillCheckCircle';
import { AiOutlineCheckCircle } from '@react-icons/all-files/ai/AiOutlineCheckCircle';

type Props = {
  memo: Memo;
  onClick: (selected: boolean, memo: Memo) => void;
  seriesId: number;
};

export default function SelectCard({ memo, onClick, seriesId }: Props) {
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
      } 
      ${
        memo.seriesId && memo.seriesId !== seriesId
          ? 'pointer-events-none brightness-50'
          : ''
      }
      ${
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
        {memo.seriesId && memo.seriesId !== seriesId ? (
          <div className="h-5 text-xs font-medium font">
            다른 시리즈에 속한 메모
          </div>
        ) : selected ? (
          <AiFillCheckCircle className="w-5 h-5" />
        ) : (
          <AiOutlineCheckCircle className="w-5 h-5" />
        )}
      </div>

      <div className="flex-1 w-full">
        <h2 className="my-3 text-xl font-extrabold break-all text-soma-grey-70 line-clamp-2 h-14">
          {memoTitle}
        </h2>
        <p className="my-1 text-sm break-all line-clamp-3 text-soma-grey-60">
          {memoDescription}
        </p>
      </div>
    </article>
  );
}
