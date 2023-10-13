import SeriesForm from '@/components/create/series/SeriesForm';
import LayoutWrapper from '@/components/shared/LayoutWrapper';

export default function CreateSeriesPage() {
  return (
    <LayoutWrapper paddingY="sm:py-10">
      <SeriesForm />
    </LayoutWrapper>
  );
}
