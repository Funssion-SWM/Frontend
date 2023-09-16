'use client';

import { addSearchHistory } from '@/service/search';
import { useRouter } from 'next/navigation';

type Props = {
  tagText: string;
};

export default function TagView({ tagText }: Props) {
  const router = useRouter();

  return (
    <div
      className={`cursor-pointer py-1 px-3 rounded-2xl bg-soma-grey-10 text-soma-blue-40 text-sm sm:text-base hover:bg-soma-grey-25 transition-all font-medium`}
      onClick={() => {
        router.push(`/search?q=${tagText}&isTag=true`);
        addSearchHistory(tagText, true);
      }}
    >
      {tagText}
    </div>
  );
}
