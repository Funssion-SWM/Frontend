import { SearchHistory } from "@/types";
import SearchHistoryItem from "./SearchHistoryItem";

type Props = {
  searchHistories : SearchHistory[];
}

export default function SearchHistoryContainer({ searchHistories }:Props) {
  return (
    <div className='mt-10'>
      <div className='font-normal text-lg'>
        최근 검색
      </div>
      <ul className="flex mt-4 flex-wrap">
        {searchHistories.map((searchHistory) => (
          <li key={searchHistory.id}>
            <SearchHistoryItem searchHistory={searchHistory} />
          </li>
        ))}
      </ul>
    </div>
  )
}