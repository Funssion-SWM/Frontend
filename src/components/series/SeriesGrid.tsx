import { Series } from '@/types/series';
import SeriesCard from './SeriesCard';

type Props = {
  seriesArr: Series[];
  colNum: number;
};

export default function SeriesGrid({ seriesArr, colNum }: Props) {
  return (
    <ul
      className={`grid gap-4 grid-cols-1 
    ${
      {
        2: 'lg:grid-cols-2',
        3: 'md:grid-cols-2 lg:grid-cols-3',
        4: 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
      }[colNum]
    }
    `}
    >
      {seriesArr?.map((series) => (
        <li key={series.id}>
          <SeriesCard series={series} />
        </li>
      ))}
    </ul>
  );
}
