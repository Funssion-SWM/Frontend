'use client';

import { useDebounce } from '@/hooks/useDebounce';
import { setCoverletterVisibleMode } from '@/service/coverletter';
import { notifyToast } from '@/service/notify';
import { useEffect, useRef, useState } from 'react';

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
    <label className="relative inline-flex items-center cursor-pointer my-5">
      <input type="checkbox" value="" className="sr-only peer" checked={isOn} />
      <div
        onClick={() => setIsOn(!isOn)}
        className="w-11 h-6 bg-gray-200 rounded-full peerdark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-soma-blue-40"
      ></div>
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        자소서 공개
      </span>
    </label>
  );
}
