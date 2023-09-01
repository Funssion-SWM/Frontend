'use client';

import { Editor, EditorContent } from '@tiptap/react';

export default function FakeEditor({ editor, extraClass }: { editor: Editor | null, extraClass?: string }) {
  // const [content, setContent] = useLocalStorage(
  //   'content',
  //   DEFAULT_EDITOR_CONTENT
  // );

  // const [saveStatus, setSaveStatus] = useState('Saved');

  // const [hydrated, setHydrated] = useState(false);

  // const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
  //   const json = editor.getJSON();
  //   setSaveStatus('Saving...');
  //   setContent(json);
  //   // Simulate a delay in saving.
  //   setTimeout(() => {
  //     setSaveStatus('Saved');
  //   }, 500);
  // }, 750);

  // Hydrate the editor with the content from localStorage.
  // useEffect(() => {
  //   if (editor && content && !hydrated) {
  //     editor.commands.setContent(content);
  //     setHydrated(true);
  //   }
  // }, [editor, content, hydrated]);

  return (
    <div
      onClick={() => {
        editor?.chain().focus().run();
      }}
      className={`fixed bg-inherit z-10 top-1/12 w-11/12 min-h-screen(-header) p-4 rounded-lg ${extraClass}`}
    >
      {/* <div className="absolute right-5 top-5 mb-5 rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400">
        {saveStatus}
      </div> */}
      <div className='text-center'>
        AI Writing...
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
