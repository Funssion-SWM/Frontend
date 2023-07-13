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
    <div className="flex flex-col items-center max-w-screen-md m-auto w-full">
      <input
        type="text"
        placeholder="제목..."
        className="w-full outline-none text-2xl px-4 py-3"
      />
      {/* <h3>tag</h3> */}
      <MyEditor editor={editor} />
      <button
        className=" self-end bg-black text-white rounded-md px-1 py-0.5 mt-1"
        onClick={handleClick}
      >
        만들기
      </button>
    </div>
  );
}
