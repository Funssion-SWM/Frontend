'use client';

import { addSearchHistory } from '@/service/search';
import { useRouter } from 'next/navigation';

type Props = {
  tagText: string;
  color?: string;
  userId?: number;
  userName?: string;
  isLogin?: boolean;
};

export default function TagView({
  tagText,
  color,
  userId,
  userName,
  isLogin,
}: Props) {
  const router = useRouter();

  return (
    <div
      className={`cursor-pointer py-1 px-3 rounded-3xl transition-all font-semibold m-1
        ${
          color == 'green'
            ? 'text-green-500 bg-green-50 hover:bg-green-200 text-sm sm:text-lg'
            : 'text-soma-blue-40 bg-soma-grey-20 hover:bg-soma-grey-30 text-sm sm:text-base'
        }
      `}
      onClick={() => {
        router.push(
          `/search?q=${tagText}&isTag=true&userId=${
            color === 'green' ? userId : '0'
          }&userName=${color === 'green' ? userName : ''}`
        );
        isLogin && addSearchHistory(tagText, true);
      }}
    >
      {tagText}
    </div>
  );
}
