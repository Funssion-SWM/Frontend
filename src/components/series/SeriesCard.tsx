import { Series } from '@/types/series';
import Image from 'next/image';
import exampleImg from '@/assets/inforumlogo1.jpeg';
import Link from 'next/link';

type Props = {
  series: Series;
};

export default function SeriesCard({ series }: Props) {
  const { firstColors, title, description, imageUrl, id } = series;

  return (
    <article
      className={`flex flex-col relative rounded-md shadow-md aspect-square pr-[10px] pb-[10px] sm:hover:scale-102 transition ease-in-out duration-300 ${
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
      } `}
    >
      <div
        className={`w-full h-full rounded-md shadow-md pr-[10px] pb-[10px] sm:hover:scale-102 duration-300 ${
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
      >
        <div
          className={`w-full h-full rounded-md shadow-md sm:hover:scale-102 duration-300 ${
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
      </div>
    </article>
  );
}
