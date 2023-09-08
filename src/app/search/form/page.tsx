import CloseIcon from '@/components/search/CloseIcon';
import SearchForm from '@/components/search/SearchForm';
import SearchHistory from '@/components/search/SearchHistory';

type Props = {
  extraClass:string,
};

export default function SearchFormPage( { extraClass }:Props ) {

  return (
    <section className={`flex flex-col max-w-screen-md m-auto ${extraClass}`}>
     
      <CloseIcon extraClass='my-7 self-end' />

      <SearchForm/>

      <SearchHistory/>
    </section>
  )
}