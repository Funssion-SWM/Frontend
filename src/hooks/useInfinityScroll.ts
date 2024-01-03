import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
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
  const isInitialMount = useRef(true);

  const fetchData = () => {
    if (isLoading || isEnd) return;
    setIsLoading(true);

    fn(pageNum)
      .then((item) => {
        setIsLoading(false);
        if (!item.length) setIsEnd(true);
        else {
          setData([...data, ...item]);
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      fetchData();
    }
  }, [pageNum]);

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    if (isEnd || isLoading) return;
    entry.isIntersecting && setPageNum(pageNum + 1);
  };

  const { setTarget } = useObserver({ onIntersect });

  return [data, isEnd, setTarget];
};
