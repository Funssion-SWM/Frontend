'use client';

import { DevelopmentArea } from '@/types/coverletter';
import { useContext, useEffect, useState } from 'react';
import SelectStacksContainer from './SelectStacksContainer';
import SelectDevelopmentAreaContainer from './SelectDevelopmentAreaContainer';
import { notifyToast } from '@/utils/notify';
import { ModalContext } from '@/context/ModalProvider';
import { useRouter, useSearchParams } from 'next/navigation';
import UserListContainer from './UserListContainer';

export default function SearchUserForJobContainer() {
  const [page, setPage] = useState(1);
  const [selectedDevelopmentArea, setSelectedDevelopmentArea] =
    useState<DevelopmentArea | null>(null);
  const [selectedStacks, setSelectedStacks] = useState<string[]>([]);

  const { open } = useContext(ModalContext);
  const router = useRouter();
  const pageNum = useSearchParams()?.get('page');

  useEffect(() => {
    if (pageNum) {
      setPage(Number(pageNum));
    }
  }, [pageNum]);

  const next = () => {
    setPage((pre) => pre + 1);
  };

  const handleDevelopmentAreaClick = (item: DevelopmentArea) => {
    setSelectedDevelopmentArea(item);
    next();
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
    next();
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      return (e.returnValue = '');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  });

  return (
    <div>
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
          3: (
            <UserListContainer
              selectedDevelopmentArea={selectedDevelopmentArea}
              selectedStacks={selectedStacks}
            />
          ),
        }[page]
      }
      <button
        className="absolute top-5 right-5 text-soma-grey-49 font-semibold"
        onClick={() => {
          open('나가시겠습니까?', () => {
            router.push('/series');
            router.refresh();
          });
        }}
      >
        나가기
      </button>
    </div>
  );
}
