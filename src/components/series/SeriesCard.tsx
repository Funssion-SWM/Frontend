import { Series } from '@/types/series';
import Image from 'next/image';
import inforumImg from '@/assets/inforumlogo1.jpeg';
import Link from 'next/link';
import basicProfileImg from '@/assets/profile.svg';
import fillHeart from '@/assets/icons/heart_fill.svg';
import { azertMono } from '@/styles/fonts';
import RelativeDate from '../shared/RelativeDate';

type Props = {
  series: Series;
};

const SERIES_CARD_PIECE_STYLE =
  'absolute w-11/12 h-10/12 rounded-md shadow-md aspect-square sm:hover:scale-102 duration-300';

export default function SeriesCard({ series }: Props) {
  const {
    topThreeColors,
    title,
    description,
    id,
    authorName,
    authorProfileImagePath,
    created,
    likes,
    thumbnailImagePath,
    authorId,
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
          }[topThreeColors[2] ?? 'white']
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
          }[topThreeColors[1] ?? 'white']
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
          }[topThreeColors[0] ?? 'white']
        }`}
      >
        <Link href={`/series/${id}`} prefetch={false}>
          <div className="relative h-1/2 rounded-md">
            <Image
              src={thumbnailImagePath ?? inforumImg}
              fill={true}
              alt="thumbnailImg"
              className="object-cover rounded-md"
            ></Image>
          </div>
        </Link>

        <div className="p-2 relative h-1/2">
          <Link href={`/series/${id}`} prefetch={false}>
            <div className="flex flex-col h-full">
              <p className="font-semibold text-lg text-soma-grey-70 line-clamp-1 my-1">
                {title}
              </p>
              <p className="line-clamp-2 break-all text-soma-grey-60 text-sm">
                {description}
              </p>
            </div>
          </Link>
          <div className="absolute w-full flex items-center text-soma-grey-60 justify-between bottom-0 left-0 p-2 text-xs">
            <div className="flex">
              <Link href={`/me/${authorId}`} prefetch={false}>
                <Image
                  src={authorProfileImagePath || basicProfileImg}
                  alt="profileImage"
                  width={16}
                  height={16}
                  className="rounded-full w-4 h-4 object-cover"
                />
              </Link>
              <p className="ml-1 font-medium">{authorName}</p>
              <p className="mx-1 text-soma-grey-45">|</p>
              <RelativeDate date={created} type="YMD" />
            </div>
            <div className="flex items-center">
              <Image src={fillHeart} alt="fill_heart" width={12} height={12} />
              <p className={`ml-1 text-soma-grey-49 ${azertMono.className}`}>
                {likes}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
