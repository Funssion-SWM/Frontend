import { DevelopmentArea } from '@/types/coverletter';
import { developmentAreaOptions } from '@/utils/const';
import { useEffect, useState } from 'react';

type Props = {
  onDevelopmentAreaClick: (developmentArea: DevelopmentArea) => void;
};

export default function SelectDevelopmentAreaContainer({
  onDevelopmentAreaClick,
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
      <div className={`sm:text-4xl text-lg font-bold `}>
        원하는 주요 분야를 선택해주세요
      </div>
      <ul
        className={`flex flex-wrap justify-center gap-10 ${
          true ? 'opacity-100' : 'opacity-0 invisible'
        }  duration-1000 ease-in-out`}
      >
        {developmentAreaOptions.map((item, idx) => {
          return (
            <li
              key={idx}
              className={`border-2 border-soma-grey-40 font-semibold text-xl 
              cursor-pointer bg-white text-soma-blue-40 w-40 h-40 flex justify-center items-center rounded-full
              hover:bg-soma-grey-30 transition-all`}
              onClick={() => onDevelopmentAreaClick(item)}
            >
              {item}
            </li>
          );
        })}
      </ul>
      <div></div>
    </div>
  );
}
