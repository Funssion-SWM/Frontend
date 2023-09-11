import { useState } from 'react';

type Props = {
  tagText: string;
  onClick: (seleted: boolean) => boolean | void;
  isSelected?: boolean;
};

export default function Tag({ tagText, onClick, isSelected }: Props) {
  const [selected, setSelected] = useState(isSelected ?? false);

  return (
    <div
      className={`cursor-pointer py-1 px-3 rounded-2xl ${
        selected ? 'bg-soma-grey-40 ' : 'bg-soma-grey-25'
      } text-soma-blue-50 text-sm sm:text-base`}
      onClick={() => {
        if (onClick(selected)) setSelected((pre) => !pre);
      }}
    >
      {tagText}
    </div>
  );
}
