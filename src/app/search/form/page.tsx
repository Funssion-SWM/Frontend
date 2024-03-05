import CloseIcon from '@/components/search/CloseIcon';
import SearchForm from '@/components/search/SearchForm';
import SearchHistoryContainer from '@/components/search/SearchHistoryContainer';
import { checkUser } from '@/service/auth';
import { getRecentSearchHistoryTop10 } from '@/service/search';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants/general';
import { cookies } from 'next/headers';

export default async function SearchFormPage() {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value;
  const refreshToken = cookies().get(REFRESH_TOKEN)?.value;
  const cookie = `${ACCESS_TOKEN}=${accessToken}; ${REFRESH_TOKEN}=${refreshToken}`;

  const { isLogin, id } = await checkUser(cookie);

  const searchHistories = isLogin
    ? await getRecentSearchHistoryTop10(cookie)
    : [];

  return (
    <section className={`flex flex-col max-w-screen-md m-auto px-4`}>
      <CloseIcon extraClass="my-7 self-end" size={24} />
      <SearchForm isLogin={isLogin} />
      {isLogin && <SearchHistoryContainer searchHistories={searchHistories} />}
    </section>
  );
}
