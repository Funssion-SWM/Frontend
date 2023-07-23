'use client';

import SelectColorBar from '@/components/SelectColorBar';
import MyEditor from '@/components/ui/editor';
import { TiptapExtensions } from '@/components/ui/editor/extensions';
import { TiptapEditorProps } from '@/components/ui/editor/props';
import { getToken } from '@/service/auth';
import { ACCESS_TOKEN } from '@/utils/const';
import { useEditor } from '@tiptap/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  preTitle?: string;
  preContent?: string;
  preColor?: string;
  isFirst: boolean;
  memoId?: number;
};

export default function EditorForm({
  preTitle = '',
  preContent,
  preColor = 'yellow',
  isFirst,
  memoId,
}: Props) {
  const router = useRouter();
  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    content: preContent,
    autofocus: 'end',
    // onUpdate: e => {
    //   setSaveStatus('Unsaved');
    //   const selection = e.editor.state.selection;
    //   const lastTwo = getPrevText(e.editor, {
    //     chars: 2,
    //   });
    //   if (lastTwo === '++' && !isLoading) {
    //     e.editor.commands.deleteRange({
    //       from: selection.from - 2,
    //       to: selection.from,
    //     });
    //     complete(
    //       getPrevText(e.editor, {
    //         chars: 5000,
    //       })
    //     );
    //     // complete(e.editor.storage.markdown.getMarkdown());
    //     va.track('Autocomplete Shortcut Used');
    //   } else {
    //     debouncedUpdates(e);
    //   }
    // },
  });
  const [title, setTitle] = useState(preTitle);
  const [selectedColor, setSelectedColor] = useState(preColor);
  const handleBtnClick = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS}/memos${
        !isFirst ? `/${memoId}` : ''
      }`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getToken(ACCESS_TOKEN)}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          memoTitle: title,
          memoDescription: 'test description',
          memoText: JSON.stringify(editor?.getJSON()),
          memoColor: selectedColor,
        }),
      }
    )
      .then((res) => {
        console.log(res);
        console.log(res.json);
        if (!res.ok) {
          throw new Error('error');
        }
        if (isFirst) router.push('/');
        else router.push(`/memos/${memoId}`);
      })
      .catch(console.error);
  };

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
  };
  return (
    <section className="flex flex-col">
      <button
        className=" self-end bg-black text-white rounded-md px-2 py-0.5 my-2"
        onClick={handleBtnClick}
      >
        {isFirst ? '등록' : '수정'}
      </button>
      <div
        className={`flex flex-col rounded-lg shadow-lg px-6 py-4 my-2 ${
          {
            yellow: 'bg-yellow-100',
            red: 'bg-red-100',
            green: 'bg-green-100',
            blue: 'bg-blue-100',
          }[selectedColor]
        }`}
      >
        <input
          type="text"
          placeholder="제목을 입력해주세요."
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full outline-none text-3xl px-4 py-3 bg-transparent font-bold mt-4 border-b-2 border-gray-400"
        />
        {/* <h3>tag</h3> */}
        <SelectColorBar selected={selectedColor} onClick={handleColorClick} />
        <MyEditor editor={editor} />
      </div>
    </section>
  );
}
