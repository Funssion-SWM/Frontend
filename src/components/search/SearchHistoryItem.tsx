'use client';

import { SearchHistory } from '@/types/common';
import CloseIcon from './CloseIcon';
import { refreshSearchHistory, removeSearchHistory } from '@/service/search';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  searchHistory: SearchHistory;
};

export default function SearchHistoryItem({ searchHistory }: Props) {
  const router = useRouter();
  const [visible, setVisible] = useState('visible');

  const removeHistory = () => {
    removeSearchHistory(searchHistory.id);
    setVisible('hidden');
  };

  const handleClick = () => {
    refreshSearchHistory(searchHistory.id);
    router.push(
      `/search?q=${searchHistory.searchText}&isTag=${searchHistory.isTag}`
    );
  };

  return (
    <div className={`flex mr-2 mb-2 text-sm sm:text-base ${visible}`}>
      <button
        className={`transition bg-white border border-r-0 rounded-l-3xl border-soma-grey-40 flex p-2 pr-0 pl-3 items-center hover:bg-soma-grey-40 ${
          searchHistory.isTag ? 'text-green-500' : ''
        }`}
        onClick={handleClick}
      >
        {searchHistory.isTag
          ? '# ' + searchHistory.searchText
          : searchHistory.searchText}
      </button>
      <button
        className="transition bg-white border border-l-0 rounded-r-3xl border-soma-grey-40 flex p-2 pr-3 items-center hover:bg-soma-grey-40"
        onClick={removeHistory}
      >
        <CloseIcon size={16} onClick={() => {}} />
      </button>
    </div>
  );
}
