'use client';

import { DevelopmentArea } from '@/types/coverletter';
import { useContext, useState } from 'react';
import SelectStacksContainer from './SelectStacksContainer';
import SelectDevelopmentAreaContainer from './SelectDevelopmentAreaContainer';
import { notifyToast } from '@/service/notify';
import { ModalContext } from '@/context/ModalProvider';
import { useRouter } from 'next/navigation';

const titles = [
  '원하는 주요 분야를 선택해주세요',
  '원하는 기술 스택 최대 3가지를 선택해주세요',
];

export default function SearchUserForJobContainer() {
  const [page, setPage] = useState(1);
  const [selectedDevelopmentArea, setSelectedDevelopmentArea] =
    useState<DevelopmentArea | null>(null);
  const [selectedStacks, setSelectedStacks] = useState<string[]>([]);

  const { open } = useContext(ModalContext);
  const router = useRouter();

  const handleDevelopmentAreaClick = (item: DevelopmentArea) => {
    setSelectedDevelopmentArea(item);
    setPage((prePage) => prePage + 1);
  };

  const handleStackClick = (item: string) => {
    if (selectedStacks.includes(item)) {
      const stacks = selectedStacks.filter((stack) => stack !== item);
      setSelectedStacks(stacks);
      return;
    }
    if (selectedStacks.length < 3) {
      setSelectedStacks([...selectedStacks, item]);
    }
  };

  const handleBtnClick = () => {
    if (selectedStacks.length === 0) {
      notifyToast('기술 스택을 한 가지 이상 선택해주세요.', 'warning');
      return;
    }

    setPage((prePage) => prePage + 1);
    console.log(selectedDevelopmentArea);
    console.log(selectedStacks);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen">
      {
        {
          1: (
            <SelectDevelopmentAreaContainer
              onDevelopmentAreaClick={handleDevelopmentAreaClick}
            />
          ),
          2: (
            <SelectStacksContainer
              selectedStacks={selectedStacks}
              onStackClick={handleStackClick}
              onBtnClick={handleBtnClick}
            />
          ),
          3: <div>리스트 보여줄꺼야</div>,
        }[page]
      }
      <button
        className="absolute top-5 right-5 text-soma-grey-49"
        onClick={() => {
          open('나가시겠습니까?', () => {
            router.back();
          });
        }}
      >
        나가기
      </button>
    </div>
  );
}
