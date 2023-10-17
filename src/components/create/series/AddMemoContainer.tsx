import BlueBtn from '@/components/shared/btn/BlueBtn';
import { useDebounce } from '@/hooks/useDebounce';
import { searchMemos } from '@/service/memos';
import { notifyToast } from '@/service/notification';
import { Memo } from '@/types/memo';
import { SEARCH_RESULT_TIME } from '@/utils/const';
import { useEffect, useState } from 'react';
import SelectCard from './SelectCard';

type Props = {
  memoIdsInSeries: number[];
  onAdd: (ids: Memo[]) => void;
  userId: number;
};

export default function AddMemoContainer({
  memoIdsInSeries,
  onAdd,
  userId,
}: Props) {
  const [searchString, setSearchString] = useState('');
  const [memos, setMemos] = useState<Memo[]>([]);
  const [selectedMemos, setSelectedMemos] = useState<Memo[]>([]);

  const realSearchString = useDebounce(searchString, SEARCH_RESULT_TIME);

  useEffect(() => {
    searchMemos(realSearchString, 'new', false, userId.toString()).then(
      (res) => {
        if ('code' in res) {
          notifyToast(res.message, 'error');
          return;
        }
        setMemos(res);
        setSelectedMemos([]);
      }
    );
  }, [realSearchString]);

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
        extraStyle="self-end"
      />
      <input
        type="text"
        className="rounded-lg my-2 bg-soma-grey-25 p-3 outline-none"
        placeholder="검색어를 입력해주세요..."
        onChange={(e) => setSearchString(e.target.value)}
        value={searchString}
      ></input>
      <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {memos
          .filter((memo) => !memoIdsInSeries.includes(memo.memoId))
          .map((memo) => (
            <li key={memo.memoId}>
              <SelectCard memo={memo} onClick={handleClickCard} />
            </li>
          ))}
      </ul>
    </div>
  );
}
