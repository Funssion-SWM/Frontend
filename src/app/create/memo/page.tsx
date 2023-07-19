'use client';

import MyEditor from '@/components/ui/editor';
import { TiptapExtensions } from '@/components/ui/editor/extensions';
import { TiptapEditorProps } from '@/components/ui/editor/props';
import { useEditor } from '@tiptap/react';

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

  const handleClick = () => {
    console.log(editor?.getJSON());
  };

  return (
    <div className="flex flex-col">
      <button
        className=" self-end bg-black text-white rounded-md px-2 py-0.5 my-2"
        onClick={handleClick}
      >
        등록
      </button>
      <div className="flex flex-col rounded-lg shadow-lg px-6 py-4 my-2 bg-yellow-100">
        <input
          type="text"
          placeholder="제목을 입력해주세요."
          className="w-full outline-none text-3xl px-4 py-3 bg-yellow-50 font-bold mt-4"
        />
        {/* <h3>tag</h3> */}
        <MyEditor editor={editor} />
      </div>
    </div>
  );
}
