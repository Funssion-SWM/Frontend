import CloseIcon from '@/components/search/CloseIcon';
import SearchForm from '@/components/search/SearchForm';
import SearchHistoryContainer from '@/components/search/SearchHistoryContainer';
import { getRecentSearchHistoryTop10 } from '@/service/search';
import { ACCESS_TOKEN } from '@/utils/const';
import { cookies } from 'next/headers';

export default async function SearchFormPage() {
  const cookie = cookies().get(ACCESS_TOKEN)?.value;

  const searchHistories = await getRecentSearchHistoryTop10(cookie);

  return (
    <section className={`flex flex-col max-w-screen-md m-auto px-4`}>
      <CloseIcon extraClass="my-7 self-end" size={24} />
      <SearchForm />
      <SearchHistoryContainer searchHistories={searchHistories} />
    </section>
  );
}
