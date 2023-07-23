'use client';

import SelectColorBar from '@/components/SelectColorBar';
import MyEditor from '@/components/ui/editor';
import { TiptapExtensions } from '@/components/ui/editor/extensions';
import { TiptapEditorProps } from '@/components/ui/editor/props';
import { createMemo } from '@/service/memos';
import { useEditor } from '@tiptap/react';
import { useState } from 'react';

export default function CreateMemoPage() {
  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
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
    autofocus: 'end',
  });

  const [title, setTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState('bg-yellow-100');
  const colors = ['bg-yellow-100', 'bg-red-100', 'bg-green-100', 'bg-blue-100'];

  const handleBtnClick = () => {
    console.log(title);
    console.log(selectedColor);
    console.log(JSON.stringify(editor?.getJSON()));
    createMemo(
      title,
      'memo description',
      JSON.stringify(editor?.getJSON()),
      selectedColor
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error('error');
        }
        return res.json();
      })
      .catch(console.error);
  };

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div className="flex flex-col">
      <button
        className=" self-end bg-black text-white rounded-md px-2 py-0.5 my-2"
        onClick={handleBtnClick}
      >
        등록
      </button>
      <div
        className={`flex flex-col rounded-lg shadow-lg px-6 py-4 my-2 ${selectedColor}`}
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
        <SelectColorBar
          colors={colors}
          selected={selectedColor}
          onClick={handleColorClick}
        />
        <MyEditor editor={editor} />
      </div>
    </div>
  );
}
