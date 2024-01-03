import { Dispatch, SetStateAction, useState } from 'react';
import useObserver from '@/hooks/useObserver';

export const useInfinityScroll = <T>(
  initialData: T[],
  fn: (c: number) => Promise<T[]>
): [
  data: T[],
  isEnd: boolean,
  setTarget: Dispatch<SetStateAction<HTMLElement | null | undefined>>
] => {
  const [data, setData] = useState<T[]>(initialData);
  const [pageNum, setPageNum] = useState(1);
  const [isEnd, setIsEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    if (isLoading || isEnd) return;
    setIsLoading(true);

    fn(pageNum)
      .then((item) => {
        if (!item.length) setIsEnd(true);
        else {
          setData([...data, ...item]);
        }
      })
      .then(() => {
        setIsLoading(false);
        setPageNum((pre) => pre + 1);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    if (isEnd || isLoading) return;
    if (entry.isIntersecting) fetchData();
  };

  const { setTarget } = useObserver({ onIntersect });

  return [data, isEnd, setTarget];
};
