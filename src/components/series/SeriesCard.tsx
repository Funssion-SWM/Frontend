import { Series } from '@/types/series';
import Image from 'next/image';
import exampleImg from '@/assets/inforumlogo1.jpeg';
import Link from 'next/link';
import basicProfileImg from '@/assets/profile.svg';
import fillHeart from '@/assets/icons/heart_fill.svg';
import { azertMono } from '@/styles/fonts';

type Props = {
  series: Series;
};

const SERIES_CARD_PIECE_STYLE =
  'absolute w-11/12 h-10/12 rounded-md shadow-md aspect-square sm:hover:scale-102 duration-300';

export default function SeriesCard({ series }: Props) {
  const {
    firstColors,
    title,
    description,
    id,
    authorName,
    authorProfileImagePath,
    created,
    likes,
  } = series;
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
        className={`bottom-4 right-4 sm:bottom-3 sm:right-3 ${SERIES_CARD_PIECE_STYLE} ${
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
          <div className="p-2 relative h-1/2">
            <p className="font-semibold text-lg text-soma-grey-70 line-clamp-1 my-1">
              {title}
            </p>
            <p className="line-clamp-2 break-all text-soma-grey-60 text-sm">
              {description}
            </p>
            <div className="absolute w-full flex items-center text-soma-grey-60 justify-between bottom-0 left-0 p-2 text-xs">
              <div className="flex">
                <Image
                  src={authorProfileImagePath || basicProfileImg}
                  alt="profileImage"
                  width={16}
                  height={16}
                  className="rounded-full w-4 h-4 object-cover"
                />
                <p className="ml-1 font-medium">{authorName}</p>
                <p className="mx-1 text-soma-grey-45">|</p>
                <p className="flex">{created}</p>
              </div>
              <div className="flex items-center">
                <Image
                  src={fillHeart}
                  alt="fill_heart"
                  width={12}
                  height={12}
                />
                <p className={`ml-1 text-soma-grey-49 ${azertMono.className}`}>
                  {likes}
                </p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </article>
  );
}
