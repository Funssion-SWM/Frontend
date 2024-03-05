import SearchUserForJobContainer from '@/components/search/user-for-job/SearchUserForJobContainer';
import LayoutWrapper from '@/components/shared/LayoutWrapper';
import { MAIN_PATH } from '@/constants/general';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default function SearchUserForJobPage() {
  const headersList = headers();
  const referer = headersList.get('referer');
  referer === null && redirect(MAIN_PATH);

  return (
    <section>
      <LayoutWrapper paddingY="sm:py-0">
        <SearchUserForJobContainer />
      </LayoutWrapper>
    </section>
  );
}
