import FollowListModal from '@/components/me/FollowListModal';
import FollowListModalProvider from '@/context/FollowListModalProvider';

export default async function MeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FollowListModalProvider>
      {children}
      <FollowListModal />
    </FollowListModalProvider>
  );
}
