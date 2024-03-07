import Link from 'next/link';

type Props = {
  currentPage?: 'memos' | 'questions' | 'series';
};

export default function NavigatorInMobile({ currentPage }: Props) {
  return (
    <div className="flex justify-center gap-4 my-2 font-semibold sm:hidden text-soma-grey-50 sm:text-lg">
      <Link
        href="/series"
        className={`${
          currentPage === 'series' && 'text-soma-blue-40'
        } hover:text-soma-blue-40 transition-all`}
        prefetch={false}
      >
        Series
      </Link>
      <Link
        href="/memos"
        className={`${
          currentPage === 'memos' && 'text-soma-blue-40'
        } hover:text-soma-blue-40 transition-all`}
        prefetch={false}
      >
        Memos
      </Link>
      <Link
        href="/questions"
        className={`${
          currentPage === 'questions' && 'text-soma-blue-40'
        } hover:text-soma-blue-40 transition-all`}
        prefetch={false}
      >
        Questions
      </Link>
    </div>
  );
}
