'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import MemoViewerHeader from './MemoViewerHeader';
import { handleTiptapExtensions } from '@/components/editor/extensions';
import TagView from '../shared/TagView';
import { handleTiptapEditorProps } from '../editor/props';

type Props = {
  title: string;
  content: string;
  color: string;
  memoTags: string[];
  memoId: number;
  likes: number;
  isLike: boolean;
  isMyMemo: boolean;
  createdDate: string;
};

export default function MemoViewer({
  title,
  content,
  color,
  memoTags,
  memoId,
  likes,
  isLike,
  isMyMemo,
  createdDate,
}: Props) {
  return (
    <section
      className={`flex flex-col sm:rounded-2xl sm:shadow-lg px-2 min-h-screen sm:min-h-for-fit-screen w-full pb-4 ${
        {
          white: 'bg-soma-white',
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
        createdDate={createdDate}
      />
      <h1 className={`text-2xl sm:text-4xl font-bold py-2 px-4 break-all`}>
        {title}
      </h1>
      <div className="h-[0.5px] mx-3 my-4 bg-soma-grey-49"></div>
      <div className="px-4 flex-grow break-all">
        <EditorContent
          editor={useEditor({
            extensions: handleTiptapExtensions('memo', memoId),
            editorProps: handleTiptapEditorProps('memo', memoId),
            editable: false,
            content: content,
          })}
        />
      </div>
      <div className="flex flex-wrap gap-1 mx-2 mt-10 mb-1">
        {memoTags.map((tag, idx) => (
          <TagView key={idx} tagText={tag} />
        ))}
      </div>
    </section>
  );
}
