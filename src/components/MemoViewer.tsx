'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import { TiptapExtensions } from './ui/editor/extensions';
import { TiptapEditorProps } from './ui/editor/props';
import WriterBtns from './WriterBtns';

type Props = {
  title: string;
  content: string;
  color: string;
  memoId: number;
};

export default function MemoViewer({ title, content, color, memoId }: Props) {
  return (
    <section
      className={`flex flex-col rounded-lg shadow-lg px-4 py-2 min-h-[650px] ${
        {
          yellow: 'bg-yellow-100',
          red: 'bg-red-100',
          green: 'bg-green-100',
          blue: 'bg-blue-100',
        }[color]
      }  my-2`}
    >
      <WriterBtns memoId={memoId} />
      <h1
        className={`text-4xl font-bold py-3 px-4 mb-5 mt-2 ${
          {
            yellow: 'bg-yellow-50',
            red: 'bg-red-50',
            green: 'bg-green-50',
            blue: 'bg-blue-50',
          }[color]
        }`}
      >
        {title}
      </h1>
      <div className="px-4">
        <EditorContent
          editor={useEditor({
            extensions: TiptapExtensions,
            editorProps: TiptapEditorProps,
            editable: false,
            content: content,
          })}
        />
      </div>
    </section>
  );
}
