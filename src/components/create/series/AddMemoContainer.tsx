import BlueBtn from '@/components/shared/btn/BlueBtn';
import { useDebounce } from '@/hooks/useDebounce';
import { searchMemos } from '@/service/search';
import { notifyToast } from '@/utils/notify';
import { Memo } from '@/types/memo';
import { SEARCH_RESULT_TIME } from '@/constants/limit';
import { useEffect, useRef, useState } from 'react';
import SelectCard from './SelectCard';
import useObserver from '@/hooks/useObserver';

type Props = {
  memoIdsInSeries: number[];
  onAdd: (ids: Memo[]) => void;
  userId: number;
  seriesId: number;
};

export default function AddMemoContainer({
  memoIdsInSeries,
  onAdd,
  userId,
  seriesId,
}: Props) {
  const [searchString, setSearchString] = useState('');
  const [memos, setMemos] = useState<Memo[]>([]);
  const [selectedMemos, setSelectedMemos] = useState<Memo[]>([]);
  const [pageNum, setPageNum] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isInitialMount = useRef(true);

  const realSearchString = useDebounce(searchString, SEARCH_RESULT_TIME);

  useEffect(() => {
    setIsLoading(true);
    setPageNum(0);
    setIsEnd(false);
    searchMemos(
      realSearchString,
      'new',
      false,
      userId.toString(),
      pageNum
    ).then((res) => {
      if ('code' in res) {
        // notifyToast(res.message, 'error');
        return;
      }
      setMemos(res);
      setSelectedMemos([]);
      setIsLoading(false);
    });
  }, [realSearchString]);

  const fetchMemos = () => {
    if (isLoading || isEnd) return;
    setIsLoading(true);
    searchMemos(realSearchString, 'new', false, userId.toString(), pageNum)
      .then((res) => {
        if ('code' in res) {
          notifyToast(res.message, 'error');
          return;
        }
        setIsLoading(false);
        if (!res.length) setIsEnd(true);
        else setMemos([...memos, ...res]);
      })
      .catch(() => setIsLoading(false));
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      fetchMemos();
    }
  }, [pageNum]);

  const onIntersect: IntersectionObserverCallback = ([entry]) => {
    if (isEnd || isLoading) return;
    entry.isIntersecting && setPageNum(pageNum + 1);
  };

  const { setTarget } = useObserver({ onIntersect });

  const handleClickCard = (selected: boolean, memo: Memo) => {
    selected
      ? setSelectedMemos(
          selectedMemos.filter((item) => item.memoId !== memo.memoId)
        )
      : setSelectedMemos([...selectedMemos, memo]);
  };

  const handleClickAddBtn = () => {
    onAdd(selectedMemos);
    setSelectedMemos([]);
  };

  return (
    <div className="flex flex-col my-3 ">
      <BlueBtn
        text="메모 추가"
        onClick={handleClickAddBtn}
        extraStyle="self-end my-2"
      />
      <input
        type="text"
        className="p-3 my-2 rounded-lg outline-none bg-soma-grey-25"
        placeholder="검색어를 입력해주세요..."
        onChange={(e) => setSearchString(e.target.value)}
        value={searchString}
      ></input>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {memos
          .filter((memo) => !memoIdsInSeries.includes(memo.memoId))
          .map((memo) => (
            <li key={memo.memoId}>
              <SelectCard
                memo={memo}
                onClick={handleClickCard}
                seriesId={seriesId}
              />
            </li>
          ))}
      </ul>
      {isEnd ? <></> : <div ref={setTarget} />}
    </div>
  );
}
