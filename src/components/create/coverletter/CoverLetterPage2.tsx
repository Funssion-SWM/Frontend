import MyEditor from '@/components/editor';
import { useEffect, useRef, useState } from 'react';
import BlueBtn from '@/components/shared/btn/BlueBtn';
import { Editor } from '@tiptap/react';

type Props = {
  onPrevBtnClick: () => void;
  onSaveBtnClick: () => void;
  editor: Editor | null;
};

export default function CoverLetterPage2({
  onPrevBtnClick,
  onSaveBtnClick,
  editor,
}: Props) {
  const edirotRef = useRef<HTMLDivElement>(null);
  const [currentScrollHeight, setCurrentScrollHeight] = useState<number>(0);
  useEffect(() => {
    if (edirotRef.current && document.scrollingElement) {
      if (currentScrollHeight < edirotRef.current.scrollHeight) {
        document.scrollingElement.scrollTop = edirotRef.current.scrollHeight;
      }
      setCurrentScrollHeight(edirotRef.current.scrollHeight);
    }
  }, [editor?.state.selection, currentScrollHeight]);

  return (
    <div>
      <div className="flex">
        <h2 className="text-xl font-semibold sm:mb-[22.5px]">
          자유롭게 자신을 어필해보세요!
        </h2>
      </div>

      <div className="flex w-full" ref={edirotRef}>
        <div
          className={`relative flex flex-col rounded-lg shadow-lg px-2 pt-2 pb-4 min-h-screen sm:min-h-screen-150px w-full bg-soma-white`}
        >
          <MyEditor editor={editor} />
        </div>
      </div>
      <div className="flex justify-end mt-5 gap-2">
        <BlueBtn text="저장" onClick={onSaveBtnClick} />
        <BlueBtn text="이전" onClick={onPrevBtnClick} />
      </div>
    </div>
  );
}
