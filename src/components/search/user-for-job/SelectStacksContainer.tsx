import BlueBtn from '@/components/shared/btn/BlueBtn';
import { stackOptions } from '@/utils/const';
import { useEffect, useState } from 'react';

type Props = {
  selectedStacks: string[];
  onStackClick: (stack: string) => void;
  onBtnClick: () => void;
};

export default function SelectStacksContainer({
  selectedStacks,
  onStackClick,
  onBtnClick,
}: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 300);
    return () => {
      setVisible(false);
    };
  }, []);

  return (
    <div
      className={`flex flex-col gap-20 items-center justify-center min-h-screen ${
        visible ? 'opacity-100' : 'opacity-0'
      } duration-1000 ease-in-out`}
    >
      <div className={`sm:text-4xl text-lg font-bold`}>
        원하는 기술 스택 최대 3가지를 선택해주세요
      </div>
      <ul className={`flex flex-wrap justify-center gap-10`}>
        {stackOptions.map((item, idx) => {
          return (
            <li
              key={idx}
              className={`border-2 border-soma-grey-40 font-semibold text-xs sm:text-base
              cursor-pointer text-soma-blue-40 w-16 h-16 text-center sm:w-32 sm:h-32 flex justify-center items-center rounded-full
              hover:bg-soma-grey-40 transition-all ${
                selectedStacks.includes(item) ? 'bg-soma-grey-40' : 'bg-white'
              }`}
              onClick={() => onStackClick(item)}
            >
              {item}
            </li>
          );
        })}
      </ul>
      <BlueBtn text="확인" onClick={onBtnClick} size="big" />
    </div>
  );
}
