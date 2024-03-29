'use client';

import { useDebounce } from '@/hooks/useDebounce';
import { setCoverletterVisibleMode } from '@/service/coverletter';
import { notifyToast } from '@/utils/notify';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineInfoCircle } from '@react-icons/all-files/ai/AiOutlineInfoCircle';

type Props = {
  coverletterIsVisible: boolean;
};

export default function CoverLetterOpenToggle({ coverletterIsVisible }: Props) {
  const [isOn, setIsOn] = useState(coverletterIsVisible);

  const isOnDebounce = useDebounce(isOn, 1000);

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setCoverletterVisibleMode(isOnDebounce).then((res) => {
        if (res) {
          notifyToast(res.message, 'error');
          return;
        }
      });
    }
  }, [isOnDebounce]);

  return (
    <label className="relative inline-flex items-center my-5 cursor-pointer">
      <input type="checkbox" value="" className="sr-only peer" checked={isOn} />
      <div
        onClick={() => setIsOn(!isOn)}
        className="w-11 h-6 bg-gray-200 rounded-full peerdark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-soma-blue-40"
      ></div>
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        자소서 공개
      </span>
      <div className="relative mx-2  group">
        <AiOutlineInfoCircle />
        <div className="absolute top-0 -right-10 sm:left-0 w-[270px] p-3 bg-white opacity-0 pointer-events-none transition-all group-hover:opacity-100 group-hover:pointer-events-auto rounded-2xl shadow-lg whitespace-pre-wrap z-10">
          자소서를 공개할 경우 채용자는 자신의 자소서와 이메일 정보를 볼 수
          있습니다.
        </div>
      </div>
    </label>
  );
}
