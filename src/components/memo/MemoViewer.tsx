'use client';

import { EditorContent, useEditor } from '@tiptap/react';

import MemoViewerHeader from './MemoViewerHeader';
import { TiptapExtensions } from '@/components/editor/extensions';
import { TiptapEditorProps } from '@/components/editor/props';

type Props = {
  title: string;
  content: string;
  color: string;
  memoId: number;
  likes: number;
  isLike: boolean;
  isMyMemo: boolean;
};

export default function MemoViewer({
  title,
  content,
  color,
  memoId,
  likes,
  isLike,
  isMyMemo,
}: Props) {
  return (
    <section
      className={`flex flex-col sm:rounded-lg sm:shadow-lg px-4 min-h-screen sm:min-h-for-fit-screen w-full pb-8 ${
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
      <MemoViewerHeader
        memoId={memoId}
        likes={likes}
        isLike={isLike}
        isMyMemo={isMyMemo}
      />
      <h1
        className={`text-2xl sm:text-4xl font-bold py-3 px-4 mb-5 break-all ${
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
      <div className="px-4 flex-grow break-all">
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
