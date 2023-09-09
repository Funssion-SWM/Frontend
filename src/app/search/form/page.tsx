import CloseIcon from '@/components/search/CloseIcon';
import SearchForm from '@/components/search/SearchForm';
import SearchHistory from '@/components/search/SearchHistory';

export default function SearchFormPage() {
  return (
    <section className={`flex flex-col max-w-screen-md m-auto`}>
      <CloseIcon extraClass="my-7 self-end" />
      <SearchForm />
      <SearchHistory />
    </section>
  );
}
