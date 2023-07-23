'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import { TiptapExtensions } from './ui/editor/extensions';
import { TiptapEditorProps } from './ui/editor/props';

type Props = {
  title: string;
  content: string;
  color: string;
};

export default function MemoViewer({ title, content, color }: Props) {
  return (
    <div
      className={`rounded-lg shadow-lg p-6 ${
        {
          yellow: 'bg-yellow-100',
          red: 'bg-red-100',
          green: 'bg-green-100',
          blue: 'bg-blue-100',
        }[color]
      }  my-2`}
    >
      <h1
        className={`text-4xl font-bold py-2 mb-5 ${
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
      <EditorContent
        editor={useEditor({
          extensions: TiptapExtensions,
          editorProps: TiptapEditorProps,
          editable: false,
          content: content,
        })}
      />
    </div>
  );
}
