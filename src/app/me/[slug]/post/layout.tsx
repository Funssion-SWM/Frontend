import MeNavigator from '@/components/me/MeNavigator';

type Props = {
  children: React.ReactNode;
  params: {
    slug: string;
  };
};

export default async function MePostLayout({
  children,
  params: { slug },
}: Props) {
  const userId = +slug;
  return (
    <div className="w-full grow sm:px-4 sm:py-2">
      <MeNavigator userId={userId} type="post" />
      {children}
    </div>
  );
}
