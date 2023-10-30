import SearchUserForJobContainer from '@/components/search/user-for-job/SearchUserForJobContainer';
import LayoutWrapper from '@/components/shared/LayoutWrapper';

export default function SearchUserForJobPage() {
  return (
    <section>
      <LayoutWrapper paddingY="sm:py-0">
        <SearchUserForJobContainer />
      </LayoutWrapper>
    </section>
  );
}
