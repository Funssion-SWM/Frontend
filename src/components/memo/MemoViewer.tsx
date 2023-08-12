'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import { TiptapExtensions } from '../ui/editor/extensions';
import { TiptapEditorProps } from '../ui/editor/props';
import MemoViewerHeader from './MemoViewerHeader';

type Props = {
  title: string;
  content: string;
  color: string;
  memoId: number;
  authorId: number;
  likes: number;
};

export default function MemoViewer({
  title,
  content,
  color,
  memoId,
  authorId,
  likes,
}: Props) {
  return (
    <section
      className={`flex flex-col rounded-lg shadow-lg px-4 min-h-[calc(100vh-120px)] pb-8 ${
        {
          yellow: 'bg-memo-yellow',
          green: 'bg-memo-green',
          skyblue: 'bg-memo-skyblue',
          orange: 'bg-memo-orange',
          pink: 'bg-memo-pink',
          navy: 'bg-memo-navy',
          purple: 'bg-memo-purple',
        }[color]
      } `}
    >
      <MemoViewerHeader memoId={memoId} authorId={authorId} likes={likes} />
      <h1
        className={`text-4xl font-bold py-3 px-4 mb-5 ${
          {
            yellow: 'bg-yellow-50',
            green: 'bg-green-50',
            skyblue: 'bg-sky-50',
            orange: 'bg-orange-50',
            pink: 'bg-pink-50',
            navy: 'bg-blue-50',
            purple: 'bg-purple-50',
          }[color]
        }`}
      >
        {title}
      </h1>
      <div className="px-4 flex-grow">
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
