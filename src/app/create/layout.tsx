import DraftsInModalProvider from '@/context/DraftsInModalProvider';
import DraftsModal from '@/components/create/DraftsModal';

export default async function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DraftsInModalProvider>
      {children}
      <DraftsModal />
    </DraftsInModalProvider>
  );
}
