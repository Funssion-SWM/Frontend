'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import { TiptapExtensions } from '../ui/editor/extensions';
import { TiptapEditorProps } from '../ui/editor/props';
import WriterBtns from '../shared/WriterBtns';
import { useEffect, useState } from 'react';
import { checkUser } from '@/service/auth';

type Props = {
  title: string;
  content: string;
  color: string;
  memoId: number;
  userId: number;
};

export default function MemoViewer({
  title,
  content,
  color,
  memoId,
  userId,
}: Props) {
  const [uid, setUid] = useState(null);
  useEffect(() => {
    async function first() {
      1;
      await checkUser()
        .then((res) => {
          if (!res.ok) throw new Error('error!!');
          return res.json();
        })
        .then((data) => {
          setUid(data.id);
        })
        .catch((err) => console.error(err));
    }
    first();
  }, []);
  return (
    <section
      className={`flex flex-col rounded-lg shadow-lg px-4 pb-8 min-h-[650px] ${
        {
          yellow: 'bg-memo-yellow',
          green: 'bg-memo-green',
          skyblue: 'bg-memo-skyblue',
          orange: 'bg-memo-orange',
          pink: 'bg-memo-pink',
          navy: 'bg-memo-navy',
          purple: 'bg-memo-purple',
        }[color]
      }  my-2`}
    >
      {userId === uid ? (
        <WriterBtns memoId={memoId} />
      ) : (
        <div className="py-1 opacity-0">.</div>
      )}
      <h1
        className={`text-4xl font-bold py-3 px-4 mb-5 mt-2 ${
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
