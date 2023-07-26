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
import BlueBtn from './BlueBtn';

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
        if (isFirst) {
          router.push('/');
          router.refresh();
        } else {
          router.push(`/memos/${memoId}`);
          router.refresh();
        }
      })
      .catch(console.error);
  };

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
  };
  return (
    <section
      className={`flex flex-col rounded-lg shadow-lg px-4 py-2 my-2 min-h-[650px] ${
        {
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
      <BlueBtn
        text={isFirst ? '등록' : '수정'}
        onClick={handleBtnClick}
        extraStyle="self-end"
      />
      <input
        type="text"
        placeholder="제목을 입력해주세요."
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full outline-none text-4xl px-4 py-3 bg-transparent font-bold mt-2 border-t-2 border-gray-400"
        autoFocus
      />
      {/* <h3>tag</h3> */}
      <SelectColorBar selected={selectedColor} onClick={handleColorClick} />
      <MyEditor editor={editor} />
    </section>
  );
}
