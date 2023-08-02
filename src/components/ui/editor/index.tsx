'use client';

import { Editor, EditorContent } from '@tiptap/react';
// import useLocalStorage from '@/lib/hooks/use-local-storage';
// import { useDebouncedCallback } from 'use-debounce';
// import va from '@vercel/analytics';
import { EditorBubbleMenu } from './components';
// import { getPrevText } from '@/app/lib/editor';

export default function MyEditor({ editor }: { editor: Editor | null }) {
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
      className="relative w-full p-4 rounded-lg "
    >
      {/* <div className="absolute right-5 top-5 mb-5 rounded-lg bg-stone-100 px-2 py-1 text-sm text-stone-400">
        {saveStatus}
      </div> */}
      {editor && <EditorBubbleMenu editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
}
