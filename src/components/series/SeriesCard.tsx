import { Series } from '@/types/series';
import Image from 'next/image';
import exampleImg from '@/assets/inforumlogo1.jpeg';
import Link from 'next/link';

type Props = {
  series: Series;
};

const SERIES_CARD_PIECE_STYLE =
  'absolute w-11/12 h-10/12 rounded-md shadow-md aspect-square sm:hover:scale-102 duration-300';

export default function SeriesCard({ series }: Props) {
  const { firstColors, title, description, id } = series;
  return (
    <article className={`flex flex-col relative w-full h-full aspect-square`}>
      <div
        className={`bottom-0 right-0 ${SERIES_CARD_PIECE_STYLE} ${
          {
            white: 'bg-soma-white',
            yellow: 'bg-memo-yellow',
            green: 'bg-memo-green',
            skyblue: 'bg-memo-skyblue',
            orange: 'bg-memo-orange',
            pink: 'bg-memo-pink',
            navy: 'bg-memo-navy',
            purple: 'bg-memo-purple',
          }[firstColors[2]]
        }`}
      ></div>
      <div
        className={`bottom-5 right-5 sm:bottom-3 sm:right-3 ${SERIES_CARD_PIECE_STYLE} ${
          {
            white: 'bg-soma-white',
            yellow: 'bg-memo-yellow',
            green: 'bg-memo-green',
            skyblue: 'bg-memo-skyblue',
            orange: 'bg-memo-orange',
            pink: 'bg-memo-pink',
            navy: 'bg-memo-navy',
            purple: 'bg-memo-purple',
          }[firstColors[1]]
        }`}
      ></div>
      <div
        className={`top-0 left-0 ${SERIES_CARD_PIECE_STYLE} ${
          {
            white: 'bg-soma-white',
            yellow: 'bg-memo-yellow',
            green: 'bg-memo-green',
            skyblue: 'bg-memo-skyblue',
            orange: 'bg-memo-orange',
            pink: 'bg-memo-pink',
            navy: 'bg-memo-navy',
            purple: 'bg-memo-purple',
          }[firstColors[0]]
        }`}
      >
        <Link href={`/series/${id}`}>
          <Image
            src={exampleImg}
            alt="example"
            className="object-cover h-1/2 rounded-md"
          ></Image>
          <div className="px-2">
            <p className="font-semibold text-lg text-soma-grey-70 line-clamp-1 my-2">
              {title}
            </p>
            <p className="line-clamp-2 break-all text-soma-grey-6 text-sm">
              {description}
            </p>
          </div>
        </Link>
      </div>
    </article>
  );
}
