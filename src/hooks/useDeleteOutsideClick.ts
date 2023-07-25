import { useState, useEffect, MutableRefObject, RefObject } from 'react';

export const useDetectOutsideClick = (
  el: RefObject<HTMLElement>,
  initialState: boolean
): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [isActive, setIsActive] = useState<boolean>(initialState);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // If the active element exists and is clicked outside of
      if (el.current !== null && !el.current.contains(e.target as Node)) {
        setIsActive((pre) => !pre);
      }
    };
    // If the item is active (ie open) then listen for clicks outside
    if (isActive) {
      window.addEventListener('click', onClick);
    }

    return () => {
      window.removeEventListener('click', onClick);
    };
  }, [isActive, el]);

  return [isActive, setIsActive];
};
