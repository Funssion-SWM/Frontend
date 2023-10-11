'use client';

import { Editor, EditorContent } from '@tiptap/react';
import { useEffect, useRef } from 'react';
import { RingLoader } from 'react-spinners';

export default function FakeEditor({ editor }: { editor: Editor | null }) {
  const edirotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (edirotRef.current) {
      edirotRef.current.scrollTop = edirotRef.current.scrollHeight;
    }
  }, [editor?.state.selection]);

  return (
    <div
      onClick={() => {
        editor?.chain().focus().run();
      }}
      ref={edirotRef}
      className={`fixed flex flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-white z-10 top-1/12 p-6 rounded-xl shadow-lg overflow-y-auto`}
    >
      <div className="font-medium text-xs text-soma-grey-45 self-end">
        chatGpt로 생성된 답변입니다. 답변이 정확하지 않을 수 있습니다.
      </div>
      <RingLoader className="self-center" color="#4992FF" />
      <div className="text-center font-medium text-soma-grey-49 text-sm my-5">
        AI Writing...
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
