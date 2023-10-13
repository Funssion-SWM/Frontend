import MemosGrid from '@/components/memo/MemosGrid';
import BlueBtn from '@/components/shared/btn/BlueBtn';
import { useDebounce } from '@/hooks/useDebounce';
import { searchMemos } from '@/service/memos';
import { notifyToast } from '@/service/notification';
import { Memo } from '@/types/memo';
import { SEARCH_RESULT_TIME } from '@/utils/const';
import { useEffect, useState } from 'react';

export default function AddMemoContainer() {
  const [searchString, setSearchString] = useState('');
  const [memos, setMemos] = useState<Memo[]>([]);

  const realSearchString = useDebounce(searchString, SEARCH_RESULT_TIME);

  useEffect(() => {
    searchMemos(realSearchString, 'new', false, '1').then((res) => {
      if (res.code) {
        notifyToast(res.message, 'error');
        return;
      }
      setMemos(res);
    });
  }, [realSearchString]);

  return (
    <div className="flex flex-col ">
      <BlueBtn text="메모 추가" onClick={() => {}} extraStyle="self-end" />
      <input
        type="text"
        className="w-full rounded-lg my-2 bg-soma-grey-25 p-3"
        placeholder="검색어를 입력해주세요..."
        onChange={(e) => setSearchString(e.target.value)}
        value={searchString}
      ></input>
      <MemosGrid memos={memos} colNum={3} />
    </div>
  );
}
