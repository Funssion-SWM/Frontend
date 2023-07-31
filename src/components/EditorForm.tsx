'use client';

import SelectColorBar from '@/components/shared/SelectColorBar';
import MyEditor from '@/components/ui/editor';
import { TiptapExtensions } from '@/components/ui/editor/extensions';
import { TiptapEditorProps } from '@/components/ui/editor/props';
import { useEditor } from '@tiptap/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import BlueBtn from './shared/BlueBtn';
import { createOrUpdateMemo } from '@/service/memos';

type Props = {
  preTitle?: string;
  preContent?: string;
  preColor?: string;
  alreadyExists: boolean;
  memoId?: number;
};

export default function EditorForm({
  preTitle = '',
  preContent,
  preColor = 'yellow',
  alreadyExists,
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
  const handleBtnClick = () =>
    createOrUpdateMemo(
      `${process.env.NEXT_PUBLIC_SERVER_IP_ADDRESS_SECURE}/memos${
        !alreadyExists ? `/${memoId}` : ''
      }`,
      {
        memoTitle: title,
        memoDescription: 'test description',
        memoText: JSON.stringify(editor?.getJSON()),
        memoColor: selectedColor,
      }
    ).then(() => {
      if (alreadyExists) router.push('/');
      else router.push(`/memos/${memoId}`);
      router.refresh();
    });

  const handleColorClick = (color: string) => setSelectedColor(color);

  return (
    <section
      className={`relative flex flex-col rounded-lg shadow-lg px-4 py-2 my-2 min-h-[650px] mt-12 ${
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
        text={alreadyExists ? '등록' : '수정'}
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
      <button
        className="absolute bottom-3 right-5 text-soma-grey-50"
        onClick={() => router.back()}
      >
        나가기
      </button>
    </section>
  );
}
