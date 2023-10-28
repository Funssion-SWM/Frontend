import MyEditor from '@/components/editor';
import { useEditor } from '@tiptap/react';
import { useEffect, useRef, useState } from 'react';
import { handleTiptapExtensions } from '@/components/editor/extensions';
import { handleTiptapEditorProps } from '@/components/editor/props';
import BlueBtn from '@/components/shared/btn/BlueBtn';
import SelectColorBar from '../memo/SelectColorBar';
import { MemoColor } from '@/types/memo';

type Props = {
  onPrevBtnClick: () => void;
};

export default function CoverLetterPage2({ onPrevBtnClick }: Props) {
  const [selectedColor, setSelectedColor] = useState<MemoColor>('yellow');

  const [contents, setContents] = useState('');

  const editor = useEditor({
    extensions: handleTiptapExtensions('question', undefined),
    editorProps: handleTiptapEditorProps('question', undefined),
    autofocus: 'end',
    onCreate: async (e) => {},
    onUpdate: (e) => {
      setContents(JSON.stringify(e.editor.getJSON()));
    },
  });

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
          메모에 자유롭게 자신을 어필해해보세요!
        </h2>
      </div>

      <div className="flex w-full" ref={edirotRef}>
        <div
          className={`relative flex flex-col rounded-lg shadow-lg px-2 pt-2 pb-4 min-h-screen sm:min-h-screen-150px w-full ${
            {
              white: 'bg-soma-white',
              yellow: 'bg-memo-yellow',
              green: 'bg-memo-green',
              skyblue: 'bg-memo-skyblue',
              orange: 'bg-memo-orange',
              pink: 'bg-memo-pink',
              navy: 'bg-memo-navy',
              purple: 'bg-memo-purple',
            }[selectedColor]
          }`}
        >
          <SelectColorBar
            selected={selectedColor}
            onClick={(color: MemoColor) => setSelectedColor(color)}
          />
          <MyEditor editor={editor} />
        </div>
      </div>
      <div className="flex justify-end mt-5 gap-2">
        <BlueBtn text="저장" onClick={() => {}} />
        <BlueBtn text="이전" onClick={onPrevBtnClick} />
      </div>
    </div>
  );
}
