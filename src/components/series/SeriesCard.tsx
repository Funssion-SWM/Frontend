import { Series } from '@/types/series';
import Image from 'next/image';
import inforumImg from '@/assets/inforumlogo1.jpeg';
import Link from 'next/link';
import basicProfileImg from '@/assets/profile.svg';
import fillHeart from '@/assets/icons/heart_fill.svg';
import { azertMono } from '@/styles/fonts';
import RelativeDate from '../shared/RelativeDate';
import { getImageSrcFromRank } from '@/utils/rank';

type Props = {
  series: Series;
};

const SERIES_CARD_PIECE_STYLE =
  'absolute w-19/20 h-19/20 rounded-md shadow-md aspect-square sm:hover:scale-102 duration-300';

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
    authorRank,
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
        className={`bottom-[9px] right-[9px] sm:bottom-[7px] sm:right-[7px] ${SERIES_CARD_PIECE_STYLE} ${
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
          <div className="relative rounded-md h-1/2">
            <Image
              src={thumbnailImagePath ?? inforumImg}
              fill={true}
              alt="thumbnailImg"
              className="object-cover rounded-md"
            ></Image>
          </div>
        </Link>

        <div className="relative p-2 h-1/2">
          <Link href={`/series/${id}`} prefetch={false}>
            <div className="flex flex-col h-full">
              <p className="my-1 text-lg font-semibold break-all text-soma-grey-70 line-clamp-1">
                {title}
              </p>
              <p className="text-sm break-all line-clamp-2 text-soma-grey-60">
                {description}
              </p>
            </div>
          </Link>
          <div className="absolute bottom-0 left-0 flex items-center justify-between w-full p-2 text-xs text-soma-grey-60">
            <div className="flex">
              <Image
                src={getImageSrcFromRank(authorRank)}
                alt="rank"
                width={16}
                height={16}
              />
              <Link href={`/me/${authorId}`} prefetch={false}>
                <Image
                  src={authorProfileImagePath || basicProfileImg}
                  alt="profileImage"
                  width={16}
                  height={16}
                  className="rounded-full w-4 h-4 object-cover mx-[2px]"
                />
              </Link>

              <p className="font-medium">{authorName}</p>
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
